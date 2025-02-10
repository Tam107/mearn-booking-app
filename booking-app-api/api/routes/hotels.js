import express from "express";
import {createHotel, deleteHotel, getAllHotels, getHotel, updateHotel} from "../controller/hotelController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management API
 */


//create - ok

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Luxury Hotel"
 *               city:
 *                 type: string
 *                 example: "New York"
 *     responses:
 *       201:
 *         description: Hotel created successfully
 */
router.post("/", createHotel);

//update - ok
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);


//get id
router.get("/:id", getHotel)

//get all
router.get("/", getAllHotels)


export default router;