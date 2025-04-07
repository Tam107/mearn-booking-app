import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)

export default mongoose.model("Policy", PolicySchema);
