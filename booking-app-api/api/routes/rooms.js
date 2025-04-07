import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controller/roomController.js";

const router = express.Router();


router.get("/getAll", getAllRooms);
router.post("/create", createRoom);
router.patch("/edit/:id",updateRoom)

export default router;
