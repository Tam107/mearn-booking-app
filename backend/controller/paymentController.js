import Booking from "../models/Booking.js";
import {buildRawData, genSecureHash} from "../utils/onepayHelper.js";
import {
    BASE_URL,
    MERCHANT_PAYNOW_ACCESS_CODE,
    MERCHANT_PAYNOW_HASH_CODE,
    ONEPAY_MERCHANT,
    ONEPAY_RETURN_URL
} from "../utils/configOnepay.js";
import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import {getCurrentRate} from "../utils/getExchangeRate.js";

export const createHotelBookingPayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bookingId = req.params.id;

        // 1. Lấy booking + populate
        const booking = await Booking.findOne({
            _id: bookingId,
            // bookingType: "HOTEL",
        }).populate({
            path: "roomType",
            populate:{path: "priceExtra"}
        }).session(session);

        console.log("Booking for payment:", booking);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        // Kiểm tra currency user chọn
        const selectedCurrency = booking.selectedCurrency || "VND";
        let exchangeRate = booking.exchangeRate; // 1 EUR = ? VND

        if (selectedCurrency === "EUR") {
            if(!exchangeRate){
                // Gọi API lấy tỷ giá hiện tại
                const currentRate = await getCurrentRate();
            }
            booking.exchangeRate = exchangeRate;

        }

        // 2. Tính số đêm
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid check-in or check-out date",
            });
        }

        // 3. Tính VND base price (theo phòng)
        let basePriceVND = booking.roomType.price * nights;

        // Check giá extra
        const applicableExtra = booking.roomType.priceExtra?.find((extra) => {
            const start = new Date(extra.start);
            const end = new Date(extra.end);
            return checkIn >= start && checkOut <= end;
        });

        if (applicableExtra) {
            basePriceVND = applicableExtra.title * nights;
        }

        // 4. Convert nếu người dùng chọn EUR
        let finalPriceVND = basePriceVND;
        let finalPriceEUR = null;

        if (selectedCurrency === "EUR") {
            finalPriceEUR = Math.round((basePriceVND / exchangeRate) * 100) / 100;
            finalPriceVND = Math.round(finalPriceEUR * exchangeRate); // VND để thanh toán OnePay
        }

        // Lưu vào booking
        booking.totalPriceVND = finalPriceVND;           // luôn lưu VND
        booking.totalPriceEUR = finalPriceEUR;        // lưu EUR nếu có
        booking.selectedCurrency = selectedCurrency;  // EUR | VND
        booking.stepPayment = true;
        booking.status = "REQUEST";
        booking.isPaid = false;

        // 5. Mã giao dịch OnePay
        const merchTxnRef = `BK_${bookingId}_${Date.now()}`;

        const payment = new Payment({
            booking: booking._id,
            gateway: "onepay",
            merchTxnRef,
            amount: finalPriceVND,
            status: "PENDING",
        })

        await payment.save({session});
        booking.payment = payment._id;
        await booking.save({session});

        // 6. Build params OnePay
        const params = {
            vpc_Version: "2",
            vpc_Command: "pay",
            vpc_AccessCode: MERCHANT_PAYNOW_ACCESS_CODE,
            vpc_Locale: "vn",
            vpc_Merchant: ONEPAY_MERCHANT,
            vpc_ReturnURL: ONEPAY_RETURN_URL,
            vpc_MerchTxnRef: merchTxnRef,
            vpc_OrderInfo: `Booking_${bookingId}`,
            vpc_Amount: (finalPriceVND * 100).toString(),
            vpc_TicketNo: req.ip?.replace("::ffff:", "") || "127.0.0.1",
            vpc_Currency: "VND",
        };

        // 7. OnePay Signature
        const rawData = buildRawData(params);
        const secureHash = genSecureHash(rawData, MERCHANT_PAYNOW_HASH_CODE);
        params.vpc_SecureHash = secureHash;

        //  Tạo URL redirect
        const redirectUrl = `${BASE_URL}?${new URLSearchParams(params).toString()}`;
        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            data: {
                bookingId: booking._id,
                paymentId: payment._id,
                totalPriceVND: finalPriceVND,
                totalPriceEUR: finalPriceEUR,
                selectedCurrency,
                paymentUrl: redirectUrl,
            },
        });

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            success: false,
            message: "Failed to create OnePay transaction",
            error: error.message,
        });
    }finally {
        session.endSession();
    }
};

export const createBusBookingPayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const bookingId = req.params.id;

        const booking = await Booking.findOne({
            _id: bookingId,
            bookingType: "BUS",
        }).populate('bus').session(session);

        if (!booking){
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        if (booking.stepPayment) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Payment already initiated",
            });
        }

        if(!booking.bus?.price){
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Bus price not available",
            });
        }

        const selectedCurrency = booking.selectedCurrency || "VND";
        let exchangeRate = booking.exchangeRate; // 1 EUR = ? VND

        if (selectedCurrency === "EUR") {
            if (!exchangeRate) {
                exchangeRate = await getCurrentRate(); //  Gọi API
            }
            booking.exchangeRate = exchangeRate;
        }

        let finalPriceVND = booking.bus.price;
        let finalPriceEUR = null;

        if (selectedCurrency === "EUR") {
            finalPriceEUR = Math.round((finalPriceVND / exchangeRate) * 100) / 100;
            finalPriceVND = Math.round(finalPriceEUR * exchangeRate);
        }

        // update booking
        booking.totalPriceVND = finalPriceVND;
        booking.totalPriceEUR = finalPriceEUR;
        booking.stepPayment = true;

        // create payment
        const merchTxnRef = `BUS_${bookingId}_${Date.now()}`;
        const payment = new Payment({
            booking: booking._id,
            gateway: "onepay",
            merchTxnRef,
            amount: finalPriceVND,
            status: "PENDING",
        })

        await payment.save({session});
        booking.payment = payment._id;
        await booking.save({session});

        // Onepay
        const params = {
            vpc_Version: "2",
            vpc_Command: "pay",
            vpc_AccessCode: MERCHANT_PAYNOW_ACCESS_CODE,
            vpc_Locale: "vn",
            vpc_Merchant: ONEPAY_MERCHANT,
            vpc_ReturnURL: ONEPAY_RETURN_URL,
            vpc_MerchTxnRef: merchTxnRef,
            vpc_OrderInfo: `Booking_${bookingId}`,
            vpc_Amount: (finalPriceVND * 100).toString(),
            vpc_TicketNo: req.ip?.replace("::ffff:", "") || "127.0.0.1",
            vpc_Currency: "VND",
        };

        const rawData = buildRawData(params);
        const secureHash = genSecureHash(rawData, MERCHANT_PAYNOW_HASH_CODE);
        params.vpc_SecureHash = secureHash;

        const redirectUrl = `${BASE_URL}?${new URLSearchParams(params).toString()}`;
        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            data: {
                bookingId: booking._id,
                paymentId: payment._id,
                totalPriceVND: finalPriceVND,
                totalPriceEUR: finalPriceEUR,
                selectedCurrency,
                paymentUrl: redirectUrl,
            },
        });

    }catch (error){
        await session.abortTransaction();
        return res.status(500).json({
            success: false,
            message: "Failed to create OnePay transaction",
            error: error.message,
        });
    }finally {
        session.endSession();
    }
}

/** ===================================
 * OnePay ReturnURL (redirect người dùng)
 * GET /api/booking/onepay/return
 * =================================== */
export const onepayReturn = async (req, res)=>{
    try{
        const params = req.query;
        const merchTxnRef = params.vpc_MerchTxnRef;
        const payment = await Payment.findOne({merchTxnRef});
        if(!payment){
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        const rawData = buildRawData(params);
        const expectedSecureHash = genSecureHash(rawData, MERCHANT_PAYNOW_HASH_CODE);
        if(expectedSecureHash !== (params.vpc_SecureHash || "").toUpperCase()){
            return res.status(400).json({ success: false, message: "Invalid Secure Hash" });
        }

        const booking = await Booking.findById(payment.booking);
        if(!booking){
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if(params.vpc_TxnResponseCode === "0"){
            // Payment.js successful
            booking.isPaid = true;
            booking.payAt = new Date();
            booking.onepay.status = "SUCCESS";
            booking.status = "PENDING";
        }else{
            // Payment.js failed
            booking.onepay.status = "FAILED";
        }

        // backend receive transactionNo from return URL
        payment.rawResponse = params;
        await payment.save();
        await booking.save();

        res.redirect(`/payment/success?bookingId=${booking._id}&status=${payment.status}`);
        return res.status(200).json({ success: true, message: "OnePay payment processed", data: booking });
    }catch (error){
        return res.status(500).json({ success: false, message: "Error in OnePay Return URL" });
    }
}

export const onepayIPN = async (req, res)=>{
    const params = req.method === "GET" ? req.query : req.body;
    const merchTxnRef = params.vpc_MerchTxnRef;
    const payment = await Payment.findOne({ merchTxnRef });
    if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const raw = buildRawData(params);
    const expectedSecureHash = genSecureHash(raw, MERCHANT_PAYNOW_HASH_CODE);
    if(expectedSecureHash !== (params.vpc_SecureHash || "").toUpperCase()){
        return res.status(400).json({ success: false, message: "Invalid Secure Hash" });
    }

    const booking = await Booking.findById(payment.booking);
    if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (params.vpc_TxnResponseCode === "0") {
        payment.status = "SUCCESS";
        payment.transactionNo = params.vpc_TransactionNo;
        payment.paidAt = new Date();

        booking.isPaid = true;
        booking.payAt = new Date();
        booking.status = "CONFIRMED";
    } else {
        payment.status = "FAILED";
    }

    payment.rawResponse = params;
    await payment.save();
    await booking.save();

    return res.status(200).json({ success: true, message: "OnePay IPN processed", data: booking });
}
// danh cho frontend gọi tạo payment
// await axios.post(`/api/booking/${booking._id}/create-payment`);