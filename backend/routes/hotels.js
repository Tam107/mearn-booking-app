import express from "express";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    updateHotel
} from "../controller/hotelController.js";

const router = express.Router();

router.post("/create", createHotel);
router.get("/getAll", getAllHotels);
router.delete("/delete/:id", deleteHotel);
router.patch("/update", updateHotel);

/**
 * @swagger
 * /backend/hotels/find/{id}:
 *   get:
 *     summary: Get a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID to retrieve
 *     responses:
 *       200:
 *         description: Hotel details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Grand Hotel"
 *                 type:
 *                   type: string
 *                   example: "Luxury"
 *                 address:
 *                   type: string
 *                   example: "123 Luxury Lane, Paradise City"
 *                 distance:
 *                   type: string
 *                   example: "5 km"
 *                 photos:
 *                   type: string
 *                   example: "https://example.com/photo.jpg"
 *                 title:
 *                   type: string
 *                   example: "Ha Giang Hotel"
 *                 description:
 *                   type: string
 *                   example: "A luxurious hotel with all amenities."
 *                 rating:
 *                   type: number
 *                   format: float
 *                   example: 4.5
 *                 rooms:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Deluxe Room", "Suite", "Standard Room"]
 *                 cheapestPrice:
 *                   type: number
 *                   example: 150
 *                 feature:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Hotel not found
 */
router.get("/find/:id", getHotel);


/**
 * @swagger
 * /backend/hotels/countByCity:
 *   get:
 *     summary: Get the count of hotels by city
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Hotel count by city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 *                 example: 5
 */
router.get("/countByCity", countByCity);

/**
 * @swagger
 * /backend/hotels/countByType:
 *   get:
 *     summary: Get the count of hotels by type
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Hotel count by type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 *                 example: 3
 */
router.get("/countByType", countByType);

export default router;
