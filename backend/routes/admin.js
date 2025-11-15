import express from "express";
import { createHotelAdmin,loginAdmin,getAdmin } from "../controller/adminController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
router.post("",createHotelAdmin );
router.post("/login",loginAdmin);
router.get("",verifyAdmin,getAdmin)
export default router;