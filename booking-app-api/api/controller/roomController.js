import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";

export const createRoom =  async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        }catch(e){
            next(e);
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const room = await Room.findOne({ "roomNumbers._id": req.params.id });
        if (!room) {
            return next(createError(404, "Room not found"));
        }

        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
        );

        res.status(200).json({ message: "Room availability updated successfully." });
    } catch (err) {
        next(err);
    }
};


export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return next(createError(404, "Room not found"));
        }

        await Room.findByIdAndDelete(req.params.id);
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return next(createError(404, "Hotel not found"));
        }

        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id },
        });

        res.status(200).json({ message: "Room deleted successfully." });
    } catch (err) {
        next(err);
    }
};


export const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id) // return updated document
        if(!room){
            return next(createError(404, "Room not found"));
        }
        res.status(200).json(room);
    }catch(err){
        next(err);
    }
}

export const getAllRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        next(err);
    }
}