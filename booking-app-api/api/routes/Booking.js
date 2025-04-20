import express from "express";
import { create,get,update,getByEmail,getAll } from "../controller/BookingController.js"
const router = express.Router();
router.post("/create",create );
router.get("/get/:id",get );
router.get("/getByEmail/:email",getByEmail );
router.get("/getAll",getAll );
router.patch("/update/:id",update );

export default router;