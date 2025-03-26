import mongoose from "mongoose";
import  slug from "mongoose-slug-updater" 
mongoose.plugin(slug)
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
        ref: "ServicesHotel",  // Trỏ tới mô hình ServiceHotel
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default:0
    },
    numberRating: {
        type: Number,
       
        default:0
    },
   
    roomType:[{
        type:String
    }],
 

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
    },
    slug:{
        type:String,
        slug:"name",
        unique:true
    }
},{ timestamps: true })

export default mongoose.model("Hotel", HotelSchema);