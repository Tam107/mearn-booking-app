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
        const faciName = req.body.name.trim().toLowerCase();

         const Exist = await Facility.find({
                    name: { $regex: `^${faciName}$`, $options: 'i' } // So sánh chính xác, không phân biệt chữ hoa chữ thường
                  });
                if (Exist.length>0) {
                    
                    return res.json({
                        success: false,
                        message: "Existed facility!"
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
