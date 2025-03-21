import express from "express";
import User from "../models/User";

const router = express.Router();
router.get("/get",async(req,res)=>{
    try{
        const service = await User.find({})
        return res.json({
            success:true,
            data:service
        })
    }catch(e){
        console.log(e);
        
    }
});

export default router;