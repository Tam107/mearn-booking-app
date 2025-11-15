import mongoose from "mongoose";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
const BusSchema = new mongoose.Schema({
    createdAt:{
      type: Date,
      default: Date.now(),
    },
    photos: {
        type: [String],
    },
    cityFrom: {
        type: String,
        required: true,
    },
    cityTo: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    totalSeats: {
        type: Number,
        required: true,
    },
    poName:{
        type: String,
        required: true,
    },
    seat:{
        type: [Number],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    policy:{
        type: [String],
        required: true,
    },
    boarding:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "BoardingArrive",
        }],
        required: true,
    },
    arrival:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "BoardingArrive",
        }],
        required: true,
    },
    facilities:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FacilitiesHotel",
        },
    ],
    conditions: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },  
},
    {timestamps: true}
)


export default mongoose.model("Bus", BusSchema);