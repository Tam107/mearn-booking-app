import express from "express";
import { create,get,update } from "../controller/BookingController.js"
const router = express.Router();
router.post("/create",create );
router.get("/get/:id",get );
router.patch("/update/:id",update );

export default router;