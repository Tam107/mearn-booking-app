import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controller/roomController.js";

const router = express.Router();


router.get("", getAllRooms);
router.post("", createRoom);
router.patch("/room/:id",updateRoom)
router.delete("/room/:id/:hotelId",deleteRoom)

export default router;
