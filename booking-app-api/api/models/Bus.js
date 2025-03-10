import mongoose from "mongoose";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
const BusSchema = new mongoose.Schema({
    busTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusType", // Liên kết đến bảng BusType
        required: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true, // Biển số xe là duy nhất
        uppercase: true, // Lưu biển số dưới dạng chữ hoa
        trim: true
    },
    bookingInfo: [
        {
            info: {
               type:Object
            },
            paymentMethod: { 
                type: String, 
                enum: ["cash", "credit_card", "momo", "paypal", "bank_transfer"], 
                required: true 
            },
            infoClient: [
                {
                    info: { 
                        type: Object, 
                        required: true 
                    },
                    seatNumber: { 
                        type: Number, 
                        required: true, 
                        min: 1 // Số ghế phải từ 1 trở lên
                    }
                }
            ],
        }
    ],
    createdAt:{
      type: Date,
      default: Date.now(),
     }
    
   
},
    {timestamps: true}
)


export default mongoose.model("Bus", BusSchema);