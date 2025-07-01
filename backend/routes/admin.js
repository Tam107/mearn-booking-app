import express from "express";
import { create,login,getAdmin } from "../controller/adminController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
router.post("/create",create );
router.post("/login",login);
router.get("/getAdmin",verifyAdmin,getAdmin)
export default router;