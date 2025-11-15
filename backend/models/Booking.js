import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const BookingSchema = new mongoose.Schema({
    bookingType:{
        type: String,
        enum: ["HOTEL","BUS"],
        // required: true,
    },
    // roomType for hotel booking
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },

    // bus for bus booking
    bus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
    },

    guests: Number,
    checkIn: Date,
    checkOut: Date,
    name: String,
    email: String,
    phoneNumber: String,
    request: String,
    isGuest: Boolean,
    nameGuest:String,

    // Thanh toán tiền tệ
    // paymentMethod: { type: String, default: "onepay" },

    // vnd price
    totalPriceVND: { type:Number, required:false },
    totalPriceEUR: Number, // euro price

    selectedCurrency: {
        type: String,
        enum: ["VND", "EUR"],
        default: "VND"
    },

    exchangeRate: { type: Number, min : 0}, // Tỷ giá áp dụng: 1 EUR = ? VND

    status: { type: String, enum: ["REQUEST", "CONFIRMED", "CANCELLED"], default: "REQUEST" },
    // payment
    payment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    stepPayment: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    payAt: Date,
}, { timestamps: true });

// Virtual để populate payment
BookingSchema.virtual('paymentInfo', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'booking',
    justOne: true
});

export default mongoose.model("Booking", BookingSchema);
