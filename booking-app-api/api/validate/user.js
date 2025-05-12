export const registerUserValidate = (req,res,next)=>{
    if(!req.body.username){
        res.status(400).json({
            code:400,
            message:"User name is required! "
        })
        return;
    }
    if(!req.body.email){

        res.status(400).json({
            message:"Email is required!"
        })
        return;
    }
    if(!req.body.password){

        res.status(400).json({
            code:400,
            message:"Password is required!"
        })
        return;
    }
   
    if(!req.body.confirmPassword){

        res.status(400).json({
            code:400,
            message:"Confirm password is required!"
        })
        return;
    }
    if(req.body.password.length <8){

        res.status(400).json({
            code:400,
            message:"Password must be at least 8 characters long!"
        })
        return;
    }
  
    next()
}   

export const loginUserValidate = (req,res,next)=>{
    if(!req.body.email){
        res.json({
            message:"Please enter your email.",
            success:false
        })
        return;
    }
    if(!req.body.password){
        res.json({
            success:false,
            message:"Please enter your password."
        })
        return;
    }
   
    next()
}