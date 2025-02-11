import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js";
import {createRoom, deleteRoom, getAllRooms, getRoom, updateRoom} from "../controller/roomController.js";

const router = express.Router();

// create
router.post("/:hotelid", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);

//delete - ok
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);

//get all
router.get("/", getAllRooms)


export default router;