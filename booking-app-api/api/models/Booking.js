import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
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
    request: String,
    nameGuest:String,
    stepPayment:{
        type:Boolean,
        default:false
    },
    paymentMethod:String,
    isPaid:{
        type:Boolean,
        default:false
    },
    payAt: Date,
    totalPrice:Number,
    totalPriceUSD:Number,
    status:{
        type:String,
        default:"Request"
    }

}, {
    timestamps: true
});

export default mongoose.model("Booking", BookingSchema);