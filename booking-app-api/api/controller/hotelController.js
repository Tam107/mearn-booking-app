import Hotel from "../models/Hotel.js";

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
     
            numberOfrooms,
            roomType,
            numberOfFloor,
            cheapestPrice,
            checkIn,
            checkOut } = req.body

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
                  message: "Cheapest Price cannot be empty"
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

              const data = new Hotel(req.body)
              console.log(data);

        res.json(1)


    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id
            , { $set: req.body }
            , { new: true }) // return updated document
        if (!updatedHotel) {
            res.status(404).json({ message: "No hotel found with id " + req.params.id })
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
            res.status(404).json({ message: "No hotel found with id " + req.params.id })
            return;
        }
        res.status(200).json(deletedHotel);
    } catch (err) {
        next(err);
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

export const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
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