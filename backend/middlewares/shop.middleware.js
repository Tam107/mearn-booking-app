const jwt = require("jsonwebtoken")
const Shop = require("../models/shop")
require("dotenv").config()

module.exports.checkToken =async (req,res,next)=>{
    
    const {seller_token} = req.cookies

    if(!seller_token){
        return res.status(401).json({
            success:false,
            message:"Please login seller to continue"
        })
    }
    try {
        const decode = jwt.verify(seller_token,process.env.JWT_SECRET);
        const user  = await Shop.findOne({_id:decode.id}).select("-password")
        req.user = user
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Please login seller to continue"
        })
    }

}