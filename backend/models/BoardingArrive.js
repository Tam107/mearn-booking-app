import mongoose from "mongoose";

const BoardingArriveSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isBoarding: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

export default mongoose.model("BoardingArrive", BoardingArriveSchema);
