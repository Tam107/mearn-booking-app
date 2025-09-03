import express from "express";
import multer from "multer";
import { uploadFromUrl, uploadImageToCloudinary, uploadMultipleImagesToCloudinary } from "../middlewares/uploadImageToCloudinary.js";

const upload = multer({ storage: multer.memoryStorage() }); 
const router = express.Router();
router.post("/upload-by-link",async(req,res)=>{
    try {
        const { imageUrl } = req.body;
        console.log("here");
        

        if (!imageUrl) {
            return res.json({
                code:400,
                message: "The image URL cannot be empty."
            });
        }
        const uploadResult = await uploadFromUrl(imageUrl);
        if(uploadResult.code==200){
            res.json({ 
                code:200,
                data: uploadResult.uploadResult
             });
        }
        else{
            res.json({ 
                code:400,
                message: uploadResult.message
             });
        }
        
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error in upload image',
                code:400
            });
    }

})

router.post("/upload-by-files",upload.array('photos',10),uploadMultipleImagesToCloudinary,(req,res)=>{
    try {
        res.json({
            success:true,
            data:req.resultsImg
        })
        
    } catch (error) {
        res.json({
            success:false,
            message: "Cannot upload by files"
        })
    }
})

export default router;