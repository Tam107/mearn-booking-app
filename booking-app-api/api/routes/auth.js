import express from "express";

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Welcome first request to auth");
})


export default router;