import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
   booking: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Booking",
         required: true,
       unique: true,
    },
    gateway: {
            type: String,
            enum: ["onepay", "paypal", "stripe"],
            required: true,
    },
    // onepay field
    merchTxnRef: { type: String, unique: true },
    transactionNo: String,
    amount: { type: Number, required: true }, // VND
    currency: { type: String, default: "VND" },

    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
        default: "PENDING",
    },

    rawResponse: { type: mongoose.Schema.Types.Mixed },
    paidAt: Date,
    refundedAt: Date,
   }, { timestamps: true });

export default mongoose.model("Payment", PaymentSchema);