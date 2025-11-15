import mongoose from "mongoose";

const FacilitiesHotelSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
         
        },
        isBus:{
            type: Boolean,
            default:false
        }
    },
    {timestamps: true}
)

export default mongoose.model("FacilitiesHotel", FacilitiesHotelSchema);
