import BoardingArrive from "../models/BoardingArrive.js"
import Bus from "../models/Bus.js"

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

export const createBus = async (req, res) => {
    try {
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.json({
            success: true,
            message: "Create bus successfully",
            data: newBus
        });
    } catch (error) {
        console.log(error);
        
        return res.json({
            success: false,
            message: "Error in BE",
        })
        
    }
}

export const getAllBus = async (req, res) => {
    try {
        const buses = await Bus.find().populate("boarding").populate("arrival").populate("facilities").sort({ createdAt: -1 });
        return res.json({
            success: true,
            message: "Get all buses successfully",
            data: buses
        });
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const deleteBus = async (req,res) => {
    try {
        const {id} = req.params
        const busDelete = await Bus.findOneAndDelete({_id:id}).populate("boarding").populate("arrival").populate("facilities")
        if(busDelete){
            return res.json({
                success: true,
                message: "Get all buses successfully",
                data: busDelete
            });
        }
        else{
            return res.json({
                success: true,
                message: "Get all buses successfully",
                data: {}
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}

export const updateBus = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const newBus = await Bus.findOneAndUpdate({_id:id},data);
        if(newBus){
            return res.json({
                success: true,
                message: "Update successfully",
                data: newBus
            });
        }
        return res.json({
            success: false,
            message: "Can not find bus",
            data: {}
        });
       
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
}
