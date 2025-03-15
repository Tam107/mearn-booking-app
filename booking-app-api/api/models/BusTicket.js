import mongoose from "mongoose";

const BusTicketSchema = new mongoose.Schema({
    busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus", // Liên kết đến bảng BusType
            required: true
    },
    customerInfo:{type:Object},
    price:Number,

},
{timestamps: true})

export default mongoose.model("BusTicket", BusTicketSchema);