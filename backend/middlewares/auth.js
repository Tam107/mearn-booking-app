const jwt = require("jsonwebtoken")
// const User = require("../models/user")
require("dotenv").config()

module.exports.checkToken =async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login to continue"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        // const user  = await User.findOne({_id:decode.id}).select("-password")
        // req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Please login to continue"
        })
    }

}