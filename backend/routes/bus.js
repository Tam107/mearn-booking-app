import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { getAllBoardingPoint, createPoint, updatePoint, deletePoint,getAllArrivalPoint } from "../controller/busController.js";
const router = express.Router();
router.get("/admin/getAll-boardingPoint",verifyAdmin,getAllBoardingPoint);
router.get("/admin/getAll-arrivalPoint", verifyAdmin, getAllArrivalPoint);
router.post("/admin/createPoint", verifyAdmin, createPoint);
router.patch("/admin/updatePoint/:id", verifyAdmin, updatePoint);
router.delete("/admin/deletePoint/:id", verifyAdmin, deletePoint);


export default router;