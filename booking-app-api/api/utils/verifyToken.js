import jwt from 'jsonwebtoken';
import {createError} from "./error.js";
import user from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(createError(403, "Token is invalid"));
        }
        req.user = user; // Assigning `user` to `req.user` after decode
        next();
    })
}


export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
    }else{
            return next(createError(403, "You are not authenticated"));
        }
    });

}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};