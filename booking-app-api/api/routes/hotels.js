import express from "express";
import Hotel from "../models/Hotel.js";
import {createHotel, deleteHotel, getAllHotels, hotel, updateHotel} from "../controller/hotelController.js";

const router = express.Router();

//create - ok
router.post("/", createHotel);

//update - ok
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);


//get id
router.get("/get/:id", hotel)

//get all
router.get("/", getAllHotels)


export default router;