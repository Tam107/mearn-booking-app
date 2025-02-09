import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);

    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id
            , {$set: req.body}
            , {new: true}) // return updated document
        if (!updatedHotel) {
            res.status(404).json({message: "No hotel found with id " + req.params.id})
            return;
        }
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id) // return updated document
        if (!deletedHotel) {
            res.status(404).json({message: "No hotel found with id " + req.params.id})
            return;
        }
        res.status(200).json(deletedHotel);
    } catch (err) {
        next(err);
    }
}

export const hotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id) // return updated document
        if(!hotel){
            res.status(404).json({message:"No hotel found with id "+req.params.id})
            return;
        }
        res.status(200).json(hotel);
    }catch(err){
        next(err);
    }
}

export const getAllHotels = async (req, res, next) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    }
}