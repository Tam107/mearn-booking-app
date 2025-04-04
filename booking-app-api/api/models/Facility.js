import mongoose from "mongoose";

const FacilitiesHotelSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)

export default mongoose.model("FacilitiesHotel", FacilitiesHotelSchema);
