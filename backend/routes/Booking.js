import express from "express";
import { createBooking,getBooking,updateBooking,getByEmail,getAllBooking,updateStatus } from "../controller/BookingController.js"
const router = express.Router();
router.post("",createBooking );
router.get("/:id",getBooking );
router.get("/by-email/:email",getByEmail);
router.get("",getAllBooking );
router.patch("/:id",updateBooking );
router.patch("/update-status/:id",updateStatus );

export default router;