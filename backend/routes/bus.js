import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { getAllBoardingPoint, createPoint, updatePoint, deletePoint,getAllArrivalPoint, createBus, getAllBus } from "../controller/busController.js";
import { create } from "../validate/bus.js";
const router = express.Router();
router.get("/admin/getAll-boardingPoint",verifyAdmin,getAllBoardingPoint);
router.get("/admin/getAll-arrivalPoint", verifyAdmin, getAllArrivalPoint);
router.get("/admin/getAll-bus", verifyAdmin, getAllBus);
router.post("/admin/createPoint", verifyAdmin, createPoint);
router.post("/admin/createBus", verifyAdmin, create, createBus);
router.patch("/admin/updatePoint/:id", verifyAdmin, updatePoint);
router.delete("/admin/deletePoint/:id", verifyAdmin, deletePoint);


export default router;