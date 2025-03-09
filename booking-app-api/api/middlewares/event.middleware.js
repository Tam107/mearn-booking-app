

module.exports.create =async (req,res,next)=>{
    const {name,category,discountPrice,stock,tags,startDate,finishDate} = req.body

    if(name.length ==0 || name === undefined || !name){
        return res.status(401).json({
            success:false,
            message:"Please enter your event name!"
        })
    }
    if(category.length ==0 || category === undefined || !category){
        return res.status(401).json({
            success:false,
            message:"Please enter your event category!"
        })
    }
    if(tags.length ==0 || tags === undefined || !tags){
        return res.status(401).json({
            success:false,
            message:"Please enter your event tags!"
        })
    }
    if( discountPrice === undefined || !discountPrice){
        return res.status(401).json({
            success:false,
            message:"Please enter your event price!"
        })
    }
    if( stock === undefined || !stock){
        return res.status(401).json({
            success:false,
            message:"Please enter your event stock!"
        })
    }
    if( startDate === undefined || !startDate){
        return res.status(401).json({
            success:false,
            message:"Please enter your event start date!"
        })
    }if( finishDate === undefined || !finishDate){
        return res.status(401).json({
            success:false,
            message:"Please enter your event finish date!"
        })
    }
    next()

}

