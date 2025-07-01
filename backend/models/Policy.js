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
        icon: {
            type: String,
         
        },
    },
    {timestamps: true}
)

export default mongoose.model("Policy", PolicySchema);
