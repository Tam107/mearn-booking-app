import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controller/roomController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management API
 */

/**
 * @swagger
 * /api/rooms/{hotelid}:
 *   post:
 *     summary: Create a new room for a hotel
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the hotel to add the room to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - desc
 *               - price
 *               - description
 *               - maxPeople
 *               - roomNumbers
 *             properties:
 *               title:
 *                 type: string
 *                 example: "King room 1"
 *               desc:
 *                 type: string
 *                 example: "King size bed 2, 1 bathroom"
 *               price:
 *                 type: number
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: "New room for hotel"
 *               maxPeople:
 *                 type: number
 *                 example: 2
 *               roomNumbers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     numbers:
 *                       type: number
 *                       example: 101
 *                 example: [{ "numbers": 101 }, { "numbers": 102 }]
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/:hotelid", verifyAdmin, createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "King room 2"
 *               desc:
 *                 type: string
 *                 example: "King size bed 2, 2 bathrooms"
 *               price:
 *                 type: number
 *                 example: 120
 *               description:
 *                 type: string
 *                 example: "Updated room for hotel"
 *               maxPeople:
 *                 type: number
 *                 example: 3
 *               roomNumbers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     numbers:
 *                       type: number
 *                       example: 103
 *                 example: [{ "numbers": 103 }]
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", verifyAdmin, updateRoom);

/**
 * @swagger
 * /api/rooms/{id}/{hotelid}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID to delete
 *       - in: path
 *         name: hotelid
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID from which the room will be deleted
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get details of a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID to retrieve
 *     responses:
 *       200:
 *         description: Room details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "King room 1"
 *                 desc:
 *                   type: string
 *                   example: "King size bed 2, 1 bathroom"
 *                 price:
 *                   type: number
 *                   example: 100
 *                 description:
 *                   type: string
 *                   example: "New room for hotel"
 *                 maxPeople:
 *                   type: number
 *                   example: 2
 *                 roomNumbers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       numbers:
 *                         type: number
 *                         example: 101
 *                   example: [{ "numbers": 101 }, { "numbers": 102 }]
 *       404:
 *         description: Room not found
 */
router.get("/:id", getRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "King room 1"
 *                   desc:
 *                     type: string
 *                     example: "King size bed 2, 1 bathroom"
 *                   price:
 *                     type: number
 *                     example: 100
 *                   description:
 *                     type: string
 *                     example: "New room for hotel"
 *                   maxPeople:
 *                     type: number
 *                     example: 2
 *                   roomNumbers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         numbers:
 *                           type: number
 *                           example: 101
 *                     example: [{ "numbers": 101 }]
 */
router.get("/", getAllRooms);

export default router;
