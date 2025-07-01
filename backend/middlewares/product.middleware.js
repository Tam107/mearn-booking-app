

module.exports.create =async (req,res,next)=>{
    const {name,category,discountPrice,stock,tags} = req.body

    if(name.length ==0 || name === undefined || !name){
        return res.status(401).json({
            success:false,
            message:"Please enter your product name!"
        })
    }
    if(category.length ==0 || category === undefined || !category){
        return res.status(401).json({
            success:false,
            message:"Please enter your product category!"
        })
    }
    if(tags.length ==0 || tags === undefined || !tags){
        return res.status(401).json({
            success:false,
            message:"Please enter your product tags!"
        })
    }
    if( discountPrice === undefined || !discountPrice){
        return res.status(401).json({
            success:false,
            message:"Please enter your product price!"
        })
    }
    if( stock === undefined || !stock){
        return res.status(401).json({
            success:false,
            message:"Please enter your product stock!"
        })
    }
    next()

}

