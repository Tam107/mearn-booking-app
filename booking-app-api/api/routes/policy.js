import express from "express";
import Policy from "../models/Policy.js";

const router = express.Router();
router.post("/get",async(req,res)=>{
    try{
        // console.log(req.body);
        
        const data = await Policy.find({type:req.body.type})
        return res.json({
            success:true,
            data:data
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
        const {name,type} = req.body
        if(!name){
            return res.json({
                success:false,
                message:"Name must not be empty"
            })
        }
        if(!type){
            return res.json({
                success:false,
                message:"Type must not be empty"
            })

        }
        const data = new Policy(req.body)
        await data.save()
        
        return res.json({
            success:true,
            data:data
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
