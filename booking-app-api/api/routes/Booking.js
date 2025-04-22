import express from "express";
import { create,get,update,getByEmail,getAll,updateStatus } from "../controller/BookingController.js"
const router = express.Router();
router.post("/create",create );
router.get("/get/:id",get );
router.get("/getByEmail/:email",getByEmail );
router.get("/getAll",getAll );
router.patch("/update/:id",update );
router.patch("/updateStatus/:id",updateStatus );

export default router;