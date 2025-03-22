import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        maxPeople: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        
        description: {
            type: String,
            required: true,
        },

        roomNumbers: [{number: Number, unavailableDates: [{type: [Date]}]}],
    },
    {timestamps: true}
)

export default mongoose.model("Room", RoomSchema);