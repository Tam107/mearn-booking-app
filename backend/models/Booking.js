import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const OnepaySchema = new mongoose.Schema({
    merchTxnRef: { type: String },          // vpc_MerchTxnRef (mã giao dịch gửi sang OnePay)
    transactionNo: { type: String },        // vpc_TransactionNo (mã giao dịch OnePay trả về)
    amount: { type: Number },               // số tiền (VND) không nhân 100
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
    },
    rawResponse: { type: mongoose.Schema.Types.Mixed }, // lưu toàn bộ query OnePay trả về
}, { _id: false });

const BookingSchema = new mongoose.Schema({
    guests: Number,
    checkIn: Date,
    checkOut: Date,
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },

    name: String,
    email: String,
    phoneNumber: String,
    request: String,
    isGuest: Boolean,
    nameGuest:String,

    stepPayment: { type: Boolean, default: false },
    paymentMethod: { type: String, default: "onepay" },

    isPaid: { type: Boolean, default: false },
    payAt: Date,

    totalPrice: { type:Number, required:true },
    totalPriceUSD: Number,

    status: { type:String, default:"Request" },

    // thanh toán onepay
    onepay: OnepaySchema

}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
