import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {JWT_EXPIREOTP, JWT_SECRET} from "../config/env.js";
dotenv.config();
const OtpUserSchema = new mongoose.Schema({
    otp:String,
    expireAt: {
        type: Date,
        expires: 180,
    },
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
    avatar: String
},{
    timestamps:true
});
OtpUserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, JWT_SECRET,{
    expiresIn: JWT_EXPIREOTP,
  });
};
export default mongoose.model("OtpUser", OtpUserSchema);