import ServicesHotel from "../models/ServiceHotel";
// import User from "../models/User.js";

export const getAll = async (req, res, next) => {
    try{
            const services = await ServicesHotel.findById() // return updated document
            
            res.status(200).json(services);
        }catch(err){
            next(err);
        }
}