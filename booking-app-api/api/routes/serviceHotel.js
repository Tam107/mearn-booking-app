import express from "express";
import ServiceHotel from "../models/ServiceHotel.js";

const router = express.Router();
router.get("/get",async(req,res)=>{
    try{
        const service = await ServiceHotel.find({})
        return res.json({
            success:true,
            data:service
        })
    }catch(e){
        console.log(e);
        
    }
});

export default router;