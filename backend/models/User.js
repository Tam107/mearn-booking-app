import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRE, JWT_SECRET} from "../config/env.js";


const UserSchema = new mongoose.Schema({
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
            required: false,
        },
        googleId: {type: String, required: false},

        phoneNumber: {
            type: String,
        },
        addresses: [
            {
                country: {
                    type: String,
                },
                city: {
                    type: String,
                },
                address1: {
                    type: String,
                },
                address2: {
                    type: String,
                },
            }
        ],
        role: {
            type: String,
            default: "user",
        },
        avatar: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        resetPasswordToken: String,
        resetPasswordTime: Date,


    },
    {timestamps: true}
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    if(this.password){
        this.password =  bcrypt.hash(this.password, 10);

    }
});

// jwt token
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    });
};

// compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("User", UserSchema);