import express from "express";
import Facility from "../models/Facility.js";
const router = express.Router();
router.get("/get",async(req,res)=>{
    try{
        const record = await Facility.find({})
        return res.json({
            success:true,
            data:record
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
        const {name} = req.body
        if(!name){
            return res.json({
                success:false,
                message:"Name must not be empty"
            })
        }
        
        const record = new Facility(req.body)
        console.log(record);
        
        await record.save()
        
        return res.json({
            success:true,
            data:record
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
