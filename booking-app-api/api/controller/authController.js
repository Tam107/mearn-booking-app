import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        // ✅ Await the salt generation
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username"));
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
        const {password, isAdmin, ...otherDetails} = user._doc;
        console.log(otherDetails);
        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json({...otherDetails});
    }catch(err) {
        next(err)
    }
}