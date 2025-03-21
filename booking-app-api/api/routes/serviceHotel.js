import express from "express";
import { getAll } from "../controller/serviceHotelController";

const router = express.Router();
router.post("/get",getAll);

export default router;