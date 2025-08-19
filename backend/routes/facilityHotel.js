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
                // if (Exist.length>0) {
                    
                //     return res.json({
                //         success: false,
                //         message: "This facility already exists"
                //     })
                // }
        
        const record = new Facility(req.body)        
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

router.patch('/edit/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        // console.log(req.body);

        if(!req.body.name){
            const updatedSer = await Facility.findByIdAndUpdate(req.params.id
                , { $set: req.body }
                , { new: true })
    
            if (!updatedSer) {
                res.json({
                    success: false,
                    message: "No facility found"
                })
                return;
            }
            return res.json({
                success: true,
                message: "Update facility succesfully",
                data:updatedSer
            })
        }

        const serviceName = req.body.name.trim().toLowerCase();

        // Sử dụng $regex để tìm kiếm không phân biệt chữ hoa chữ thường và giữ nguyên dữ liệu trong cơ sở dữ liệu
        const Exist = await Facility.find({
            name: { $regex: `^${serviceName}$`, $options: 'i' } // So sánh chính xác, không phân biệt chữ hoa chữ thường
          });
        if (Exist.length>0) {
            // console.log(Exist);
            
            return res.json({
                success: false,
                message: "Existed facility!"
            })
        }
        
        const updatedSer = await Facility.findByIdAndUpdate(req.params.id
            , { $set: req.body }
            , { new: true })

        if (!updatedSer) {
            res.json({
                success: false,
                message: "No facility found"
            })
            return;
        }
        return res.json({
            success: true,
            message: "Update facility succesfully",
            data:updatedSer
        })
        

        


        

    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        // console.log(req.params);
        
        await Facility.deleteOne({ _id: req.params.id })
        res.json({
            success: true,
            message: "Deleted successfully!"
        })
    } catch (error) {
        console.log(e);
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
})
export default router;
