import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
  
    description: {
        type: String,
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceHotel",  // Trỏ tới mô hình ServiceHotel
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default:0
    },
    numberOfrooms: {
        type: Number,
    },
    roomType:[{
        type:String
    }],
    numberOfFloor: {
        type: Number,
    },

    cheapestPrice: {
        type: Number,
        required: true,
    },
    feature:{
        type: Boolean,
        default: false,
    },
    
   
    checkIn: {
        type: Date,  // Store time as a Date object
    },
    checkOut: {
        type: Date,  // Store time as a Date object
    }
})

export default mongoose.model("Hotel", HotelSchema);