import BoardingArrive from "../models/BoardingArrive.js"

export const getAllBoardingPoint = async (req, res) => {
    try {
        const boardingPoints = await BoardingArrive.find({ isBoarding: true }).sort({ createdAt: -1 })
        return res.json({
            success: true,
            message: "Get all boarding points successfully",
            data: boardingPoints
        })
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const getAllArrivalPoint = async (req, res) => {
    try {
        const boardingPoints = await BoardingArrive.find({ isBoarding: false }).sort({ createdAt: -1 })
        return res.json({
            success: true,
            message: "Get all boarding points successfully",
            data: boardingPoints
        })
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const createPoint = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.address || !data.city) {
            return res.json({
                success: false,
                message: "Please provide all required fields",
            })
        }
        const newBoardingPoint = new BoardingArrive(data);
        await newBoardingPoint.save();
        return res.json({
            success: true,
            message: "Create boarding point successfully",
            data: newBoardingPoint
        });
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const deletePoint = async (req,res)=>{
    try{
        const { id } = req.params;        
        const boardingPoint = await BoardingArrive.findByIdAndDelete(id);
        if (!boardingPoint) {
            return res.json({
                success: false,
                message: "Boarding point not found",
            });
        }
        return res.json({
            success: true,
            message: "Delete boarding point successfully",
            data: boardingPoint
        });
    }
    catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
}
export const updatePoint = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data.name || !data.address || !data.city) {
            return res.json({
                success: false,
                message: "Please provide all required fields",
            });
        }
        const boardingPoint = await BoardingArrive.findByIdAndUpdate(id, data, { new: true });
        if (!boardingPoint) {
            return res.json({
                success: false,
                message: "Boarding point not found",
            });
        }
        return res.json({
            success: true,
            message: "Update boarding point successfully",
            data: boardingPoint
        });
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
}