import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";

export const createRoom =  async (req, res, next) => {
    try {
        if (!req.body.RoomType) {
            return res.json({
                success: false,
                message: "RoomType is required",
            })
        }
        if (!req.body.hotel) {
            return res.json({
                success: false,
                message: "Hotel is required",
            })
        }
        if (!req.body.price) {
            return res.json({
                success: false,
                message: "Price is required",
            })
        }
        if (!req.body.maxPeople) {
            return res.json({
                success: false,
                message: "MaxPeople is required",
            })
        }
       
        if (!req.body.services) {
            return res.json({
                success: false,
                message: "Services is required",
            })
        }
        if (!req.body.facilities) {
            return res.json({
                success: false,
                message: "Facilities is required",
            })
        }
        const room = new Room({
            RoomType: req.body.RoomType,
            description: req.body.description,
            photos: req.body.photos,
            maxPeople: req.body.maxPeople,
            services: req.body.services,
            hotel: req.body.hotel,
            price: req.body.price,
            priceExtra: req.body.priceExtra,
            facilities:req.body.facilities,
        });
        const savedRoom = await room.save();

        const hotel = await Hotel.findByIdAndUpdate(
            req.body.hotel,
            { $push: { roomType: savedRoom } },
            { new: true }
        );

        
        res.json({
            success: true,
            data: savedRoom,
            dataHotel: hotel,
           
        });
    } catch (err) {
        console.log(err);
        
        next(err); 
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        // console.log(req.body);

        if (!req.body.RoomType) {
            return res.json({
                success: false,
                message: "RoomType is required",
            })
        }
        if (!req.params.id) {
            return res.json({
                success: false,
                message: "Hotel is required",
            })
        }
        if (!req.body.price) {
            return res.json({
                success: false,
                message: "Price is required",
            })
        }
        if (!req.body.maxPeople) {
            return res.json({
                success: false,
                message: "MaxPeople is required",
            })
        }
       
        if (!req.body.services) {
            return res.json({
                success: false,
                message: "Services is required",
            })
        }
        if (!req.body.facilities) {
            return res.json({
                success: false,
                message: "Facilities is required",
            })
        }
        // console.log(req.params.id)
        // console.log(await Room.find({_id:req.params.id}));
        ;
        
        const result = await Room.updateOne({ _id: req.params.id }, req.body);
        if (result.modifiedCount === 0) {
          return res.json({ message: "Hotel not found or data unchanged",success:false });
        }
        res.json({
            success:true
        })    
      
       
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
    try {
        // console.log("herre");
        
        // Fetch all rooms
        const rooms = await Room.find({}).populate("services").populate('hotel').sort({ createdAt: -1 }); 
        
        // Populate hotel and services fields if needed
       
        
        // Respond with rooms data
        res.json({
            success: true,
            data: rooms
        });
    } catch (err) {
        console.log(err);
        
        next(err); // Pass error to the error handler middleware
    }
};
