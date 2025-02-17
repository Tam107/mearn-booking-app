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

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management API
 */

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
 *             required:
 *               - name
 *               - type
 *               - address
 *               - distance
 *               - photos
 *               - title
 *               - description
 *               - rating
 *               - rooms
 *               - cheapestPrice
 *               - feature
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Grand Hotel"
 *               type:
 *                 type: string
 *                 example: "Luxury"
 *               address:
 *                 type: string
 *                 example: "123 Luxury Lane, Paradise City"
 *               distance:
 *                 type: string
 *                 example: "5 km"
 *               photos:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               title:
 *                 type: string
 *                 example: "Ha Giang Hotel"
 *               description:
 *                 type: string
 *                 example: "A luxurious hotel with all amenities."
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Deluxe Room"
 *                 example: ["Deluxe Room", "Suite", "Standard Room"]
 *               cheapestPrice:
 *                 type: number
 *                 example: 150
 *               feature:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Update an existing hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               address:
 *                 type: string
 *               distance:
 *                 type: string
 *               photos:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *                 format: float
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: string
 *               cheapestPrice:
 *                 type: number
 *               feature:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", updateHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Delete a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID to delete
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *       404:
 *         description: Hotel not found
 */
router.delete("/:id", deleteHotel);

/**
 * @swagger
 * /api/hotels/find/{id}:
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
 * /api/hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: List of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Grand Hotel"
 *                   type:
 *                     type: string
 *                     example: "Luxury"
 *                   address:
 *                     type: string
 *                     example: "123 Luxury Lane, Paradise City"
 *                   distance:
 *                     type: string
 *                     example: "5 km"
 *                   photos:
 *                     type: string
 *                     example: "https://example.com/photo.jpg"
 *                   title:
 *                     type: string
 *                     example: "Ha Giang Hotel"
 *                   description:
 *                     type: string
 *                     example: "A luxurious hotel with all amenities."
 *                   rating:
 *                     type: number
 *                     format: float
 *                     example: 4.5
 *                   rooms:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Deluxe Room", "Suite", "Standard Room"]
 *                   cheapestPrice:
 *                     type: number
 *                     example: 150
 *                   feature:
 *                     type: boolean
 *                     example: true
 */
router.get("/", getAllHotels);

/**
 * @swagger
 * /api/hotels/countByCity:
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
 * /api/hotels/countByType:
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
