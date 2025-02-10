import User from "../models/User.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management API
 */

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id
            , {$set: req.body}
            , {new: true}) // return updated document
        if (!updatedUser) {
            res.status(404).json({message: "No User found with id " + req.params.id})
            return;
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser= await User.findByIdAndDelete(req.params.id) // return updated document
        if (!deletedUser) {
            res.status(404).json({message: "No User found with id " + req.params.id})
            return;
        }
        res.status(200).json(deletedUser);
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id) // return updated document
        if(!user){
            res.status(404).json({message:"No User found with id "+req.params.id})
            return;
        }
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

export const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}