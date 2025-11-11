import { sendAdminToken } from "../helpers/JsonToken.js"
import Admin from "../models/Admin.js"
export const createHotelAdmin = async(req, res)=>{
    try {
        const {username,email,password,phoneNumber} = req.body

        const admin = new Admin({
            username,
            email,
            password,
            phoneNumber
        })
        await admin.save()
        return res.json({
            success: true,
            message: "Admin created successfully",
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const loginAdmin = async(req, res)=>{
    try {
        const {email,password} = req.body

        const admin = await Admin.findOne({email:email})
        if(!admin){
            return res.json({
                success: false,
                message: "Admin not found",
            })
        }
        const isPass = await admin.comparePassword(password)
        if(!isPass){
            return res.json({
                success: false,
                message: "Password is not correct",
            })
        }
        sendAdminToken(admin, 201,res)

        
        
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const getAdmin = async(req,res)=>{
    try {
        res.status(200).json({
            success: true,
            data:req.admin,
          });
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in BE get admin"
        })
    }
}
