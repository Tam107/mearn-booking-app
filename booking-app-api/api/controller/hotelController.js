import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management API
 */

export const createHotel = async (req, res) => {
    try {
        
        const { name,
            type,
            city,
            address,
            photos,
            description,
            services,
            roomType,
            cheapestPrice,
            checkIn,
            checkOut,policy } = req.body

            // console.log(checkIn,checkOut);
            

            if (!name) {
                return res.json({
                  success: false,
                  message: "Name cannot be empty"
                });
              }
              
              if (!type) {
                return res.json({
                  success: false,
                  message: "Type of accommodation cannot be empty"
                });
              }
              
              if (!city) {
                return res.json({
                  success: false,
                  message: "City cannot be empty"
                });
              }
              
              if (!address) {
                return res.json({
                  success: false,
                  message: "Address cannot be empty"
                });
              }
              
              if (roomType.length === 0) {
                return res.json({
                  success: false,
                  message: "At least one room type is required"
                });
              }
              
              if (!cheapestPrice) {
                return res.json({
                  success: false,
                  message: "Invalid price"
                });
              }
              if(cheapestPrice<0){
                return res.json({
                    success: false,
                    message: "Invalid price"
                  });
              }
              
              if (!checkIn) {
                return res.json({
                  success: false,
                  message: "Check-in time cannot be empty"
                });
              }
              
              if (!checkOut) {
                return res.json({
                  success: false,
                  message: "Check-out time cannot be empty"
                });
              }

              const data = new Hotel({
                name,
                type,
                city,
                address,
                photos,
                description,
                services,
                policy,
                cheapestPrice,
                checkIn,
                checkOut
              })
              
              await data.save();
              
              for(let i =0;i<roomType.length;i++){
                const dataRoom = {
                    RoomType:roomType[i],
                    services:services||[],
                    hotel:data._id,
                    price:cheapestPrice
                }
                const room = new Room(dataRoom)
                await room.save();
                await Hotel.updateOne(
                    { _id: data._id },
                    { $push: { roomType: room._id } },
                    { new: true }
                )
              }
                const newData = await Hotel.findById(data._id)

        res.json({
            success:true,
            data:newData
        })


    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({}).populate('services').populate("roomType").populate('policy').sort({ createdAt: -1 });
        res.status(200).json({
            success:true,
            data:hotels
        });
    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.body._id);

        // console.log(req.body.services);
        
        
        
        const roomType= hotel.roomType;
        const updatedHotel = await Hotel.findByIdAndUpdate(req.body._id
            , { $set: req.body }
            , { new: true })
        console.log(updatedHotel);
        
        if (!updatedHotel) {
            res.json({
                success: false,
                message: "No hotel found with id " + req.body._id
            })
            return;
        }
       
    

        
        res.status(200).json({
            success:true,   
            data:updatedHotel,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
      
       const deletedHotel = await Hotel.findByIdAndDelete(req.params.id) 
        if (!deletedHotel) {
            res.status(404).json({ message: "No hotel found with id " + req.params.id })
            res.json({
                success: false,
                message:"No hotel found with id " + req.params.id 
            })
            return;
        }

        const roomsToDelete = await Room.find({ hotel: req.params.id  });
        if(roomsToDelete.length > 0){
            await Room.deleteMany({ hotel: req.params.id  });
            res.status(200).json({
                success:true,
                data:deletedHotel,
                rooms:roomsToDelete
            });
        }
        else{
            res.status(200).json({
                success:true,
                data:deletedHotel
            });
        }
       
    } catch (err) {
        next(err);
        res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id) // return updated document
        if (!hotel) {
            res.status(404).json({ message: "No hotel found with id " + req.params.id })
            return;
        }
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}



// export const countByCity = async (req, res, next) => {
//     const cities = req.query.cities.split(','); // Transform string to array
//     console.log(`Cities array: ${cities}`); // Log the input cities array
//
//     try {
//         const list = await Promise.all(cities.map(async (city) => {
//             const count = await Hotel.countDocuments({ city: city });
//             console.log(`Count for city: ${city}, Count: ${count}`); // Log each count
//             return count;
//         }));
//
//         console.log(`The list of counts is: ${list}`); // Log the entire list
//         return res.status(200).json(list);
//
//     } catch (err) {
//         next(err); // Pass the error to the error handling middleware
//     }
// };

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};


export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabin", count: cabinCount },

        ]);
    } catch (err) {
        next(err);
    }

}