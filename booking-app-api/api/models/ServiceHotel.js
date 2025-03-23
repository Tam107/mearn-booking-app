import mongoose from "mongoose";

const ServicesHotelSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        description: {
            type: String,
           
        },
    },
    {timestamps: true}
)

export default mongoose.model("ServicesHotel", ServicesHotelSchema);
