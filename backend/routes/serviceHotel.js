import express from "express";
import ServiceHotel from "../models/ServiceHotel.js";

const router = express.Router();
router.get("", async (req, res) => {
    try {
        const service = await ServiceHotel.find({})
        return res.json({
            success: true,
            data: service
        })
    } catch (e) {
        console.log(e);
        return res.json({
            success: false,
            message: "Error in BE"
        })

    }
});

router.post("", async (req, res) => {
    try {
        const { name, icon } = req.body
        if (!name) {
            return res.json({
                success: false,
                message: "Name must not be empty"
            })
        }
        if (!icon) {
            return res.json({
                success: false,
                message: "Icon must not be empty"
            })

        }
        const serviceName = req.body.name.trim().toLowerCase();

        // Sử dụng $regex để tìm kiếm không phân biệt chữ hoa chữ thường và giữ nguyên dữ liệu trong cơ sở dữ liệu
        const Exist = await ServiceHotel.find({
            name: { $regex: `^${serviceName}$`, $options: 'i' } // So sánh chính xác, không phân biệt chữ hoa chữ thường
          });
        if (Exist.length>0) {
            // console.log(Exist);
            
            return res.json({
                success: false,
                message: "Existed service"
            })
        }
        const ser = new ServiceHotel(req.body)
        await ser.save()

        return res.json({
            success: true,
            data: ser
        })
    } catch (e) {
        console.log(e);
        return res.json({
            success: false,
            message: "Error in BE"
        })

    }
});

router.delete("/:id", async (req, res) => {
    try {
        await ServiceHotel.deleteOne({ _id: req.params.id })
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

router.patch('/:id', async (req, res) => {
    try {
        if(!req.body.name){
            const updatedSer = await ServiceHotel.findByIdAndUpdate(req.params.id
                , { $set: req.body }
                , { new: true })
    
            if (!updatedSer) {
                res.json({
                    success: false,
                    message: "No service found"
                })
                return;
            }
            return res.json({
                success: true,
                message: "Update service succesfully",
                data:updatedSer
            })
        }

        const serviceName = req.body.name.trim().toLowerCase();

        // Sử dụng $regex để tìm kiếm không phân biệt chữ hoa chữ thường và giữ nguyên dữ liệu trong cơ sở dữ liệu
        const Exist = await ServiceHotel.find({
            name: { $regex: `^${serviceName}$`, $options: 'i' } // So sánh chính xác, không phân biệt chữ hoa chữ thường
          });
        if (Exist.length>0) {
            // console.log(Exist);
            
            return res.json({
                success: false,
                message: "Existed service!"
            })
        }
        const updatedSer = await ServiceHotel.findByIdAndUpdate(req.params.id
            , { $set: req.body }
            , { new: true })

        if (!updatedSer) {
            res.json({
                success: false,
                message: "No service found"
            })
            return;
        }
        return res.json({
            success: true,
            message: "Update service succesfully",
            data:updatedSer
        })

    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
})

export default router;