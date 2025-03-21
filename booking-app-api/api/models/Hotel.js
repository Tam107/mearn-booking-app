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
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    feature:{
        type: Boolean,
        default: false,
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceHotel",  // Trỏ tới mô hình ServiceHotel
    }],
})

export default mongoose.model("Hotel", HotelSchema);