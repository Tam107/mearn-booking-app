import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { getAllBoardingPoint, createPoint, updatePoint, deletePoint,getAllArrivalPoint, createBus, getAllBus, deleteBus, updateBus } from "../controller/busController.js";
import { create } from "../validate/bus.js";
const router = express.Router();
router.get("/admin/boarding-points",getAllBoardingPoint);
router.get("/admin/arrival-points", getAllArrivalPoint);
router.get("/admin/buses", getAllBus);
router.post("/admin/create-point", verifyAdmin, createPoint);
router.post("/admin/createBus", verifyAdmin, create, createBus);
router.patch("/admin/point/:id", verifyAdmin, updatePoint);
router.delete("/admin/point/:id", verifyAdmin, deletePoint);
router.delete("/admin/buses/:id", verifyAdmin, deleteBus);
router.patch("/admin/update-bus/:id", verifyAdmin, create, updateBus)


export default router;