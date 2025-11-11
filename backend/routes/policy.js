import express from "express";
import Policy from "../models/Policy.js";

const router = express.Router();
router.post("",async(req,res)=>{
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
            message:"Internal Server Error in Policy"
        })
        
    }
});

router.post("",async(req,res)=>{
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
        const policyName = req.body.name.trim().toLowerCase();
         const Exist = await Policy.find({
                    name: { $regex: `^${policyName}$`, $options: 'i' },
                    type:req.body.type // So sánh chính xác, không phân biệt chữ hoa chữ thường
                  });
                  if (Exist.length>0) {
                    // console.log(Exist);
                    
                    return res.json({
                        success: false,
                        message: "Existed policy!"
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
            message:"Internal Server Error in Policy"
        })
        
    }
});
router.delete("/policy/:id", async (req, res) => {
    try {
        // console.log(req.params);
        
        await Policy.deleteOne({ _id: req.params.id })
        res.json({
            success: true,
            message: "Deleted successfully!"
        })
    } catch (error) {
        console.log(e);
        return res.json({
            success: false,
            message: "Internal Server Error in Policy"
        })
    }
})
router.patch('/policy/:id', async (req, res) => {
    try {
       if(!req.body.name){
    
        
                   const updatedSer = await Policy.findByIdAndUpdate(req.params.id
                       , { $set: req.body }
                       , { new: true })
           
                   if (!updatedSer) {
                       res.json({
                           success: false,
                           message: "No policy found"
                       })
                       return;
                   }
                   return res.json({
                       success: true,
                       message: "Update policy succesfully",
                       data:updatedSer
                   })
               }

        const serviceName = req.body.name.trim().toLowerCase();

        // Sử dụng $regex để tìm kiếm không phân biệt chữ hoa chữ thường và giữ nguyên dữ liệu trong cơ sở dữ liệu
        const Exist = await Policy.find({
            name: { $regex: `^${serviceName}$`, $options: 'i' },
            type:req.body.typePolicy // So sánh chính xác, không phân biệt chữ hoa chữ thường
          });
        if (Exist.length>0) {
            // console.log(Exist);
            
            return res.json({
                success: false,
                message: "Existed policy!"
            })
        }
        
        const updatedSer = await Policy.findByIdAndUpdate(req.params.id
            , { $set: req.body }
            , { new: true })

        if (!updatedSer) {
            res.json({
                success: false,
                message: "No policy found"
            })
            return;
        }
        return res.json({
            success: true,
            message: "Update policy succesfully",
            data:updatedSer
        })

    } catch (error) {
        console.log(error);
        
        return res.json({
            success: false,
            message: "Internal Server Error in Policy"
        })
    }
})
export default router;
