import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
        RoomType:{
            type: String,
            required: true,
        },
        photos: {
            type: [String],
        },
        maxPeople: {
            type: Number,
        },
        services: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "ServiceHotel", 
            }],
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel", 
        },
        price:{
            type:Number
        },
        priceExtra:[],
    },
    {timestamps: true}
)

export default mongoose.model("Room", RoomSchema);