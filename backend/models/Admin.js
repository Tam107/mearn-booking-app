import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
    },
      role:{
        type: String,
        default: "admin",
      },
      role_authority:{
        type: String,
      },
    avatar:{
        type: String
    },
     createdAt:{
      type: Date,
      default: Date.now(),
     },
    resetPasswordToken: String,
    resetPasswordTime: Date,
    
   
},
    {timestamps: true}
    )

    AdminSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    });

    // jwt token
    AdminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password
AdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("Admin", AdminSchema);