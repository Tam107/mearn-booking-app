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
        return res.json({
            success:false,
            message:"Error in BE"
        })
        
    }
});

router.post("/create",async(req,res)=>{
    try{
        const {name,icon} = req.body
        if(!name){
            return res.json({
                success:false,
                message:"Name must not be empty"
            })
        }
        if(!icon){
            return res.json({
                success:false,
                message:"Icon must not be empty"
            })

        }
        const ser = new ServiceHotel(req.body)
        await ser.save()
        
        return res.json({
            success:true,
            data:ser
        })
    }catch(e){
        console.log(e);
        return res.json({
            success:false,
            message:"Error in BE"
        })
        
    }
});

export default router;