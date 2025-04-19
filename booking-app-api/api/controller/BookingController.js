
import { populate } from "dotenv"
import Admin from "../models/Admin.js"
import Booking from "../models/Booking.js"
export const create = async(req,res)=>{
    try {
        

        const booking = new Booking( req.body)
        await booking.save()
        return res.json({
            success: true,
           data:booking
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const get = async (req, res) => {
    try {
        console.log(req.params);
        console.log("vao day");
        
        
        const data = await Booking.findOne({ _id: req.params.id })
        .populate({
          path: "roomType", // Populate roomType
          populate: [
            {
                path: "hotel",
                populate:{
                    path:"policy"
                }
              },
              {
                path:"services"
              },
              {
                path:"facilities"
              }
          ],
        })      
        // Kiểm tra nếu `data` tồn tại và không phải là một đối tượng rỗng
        if (data && Object.keys(data).length > 0) {
            return res.json({
                success: true,
                data: data,
            });
        } else {
            return res.json({
                success: false,
                message: "No booking found or data is empty",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
};

export const update = async (req, res) => {
    try {
        
        
        
        if (!req.params.id) {
            return res.status(200).json({
                success: false,
                message: "Booking ID is required",
            });
        }

        // Tìm và cập nhật booking theo ID
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, // ID của booking cần cập nhật
            req.body, // Dữ liệu cần cập nhật
            { new: true, runValidators: true } // Trả về bản ghi đã cập nhật và chạy validate
        );

        // Kiểm tra nếu không tìm thấy booking
        if (!updatedBooking) {
            return res.status(200).json({
                success: false,
                message: "Booking not found",
            });
        }

        // Trả về kết quả thành công
        return res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: updatedBooking,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
};