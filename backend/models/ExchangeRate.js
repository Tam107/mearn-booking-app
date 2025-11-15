import mongoose from "mongoose";

const ExchangeRateSchema = new mongoose.Schema({
    from: { type: String, required: true }, // "EUR"
    to:   { type: String, required: true }, // "VND"
    rate: { type: Number, required: true }, // 1 EUR = 27,000 VND
    source: { type: String },               // "api", "manual"
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("ExchangeRate", ExchangeRateSchema);