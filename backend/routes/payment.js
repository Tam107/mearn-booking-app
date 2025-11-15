import express from "express";
import {
    createHotelBookingPayment,
    createBusBookingPayment,
    onepayIPN,
    onepayReturn
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/hotel/:id", createHotelBookingPayment);
router.post("/bus/:id", createBusBookingPayment);
router.get("/onepay/return", onepayReturn);
router.all("/onepay/ipn", onepayIPN);

export default router;