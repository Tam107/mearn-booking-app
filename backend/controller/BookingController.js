
// import { populate } from "dotenv"
import Admin from "../models/Admin.js"
import Booking from "../models/Booking.js"
import { sendMail } from "../helpers/sendMail.js"
export const createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body)
        await booking.save()
        return res.json({
            success: true,
            data: booking
        })
    } catch (error) {
        // console.log(error)
        return res.json({
            success: false,
            message: "Error in BE",
        })
    }
}
export const getBooking = async (req, res) => {
    try {
        // console.log(req.params);
        // console.log("vao day");
        const data = await Booking.findOne({ _id: req.params.id })
            .populate({
                path: "roomType", // Populate roomType
                populate: [
                    {
                        path: "hotel",
                        populate: {
                            path: "policy"
                        }
                    },
                    {
                        path: "services"
                    },
                    {
                        path: "facilities"
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
        // console.log(error);
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
};
export const getByEmail = async (req, res) => {
    try {

        // console.log(req.params);
        const data = await Booking.find({ email: req.params.email }).sort({createdAt:-1})
            .populate({
                path: "roomType", // Populate roomType
                populate: [
                    {
                        path: "hotel",
                        populate: {
                            path: "policy"
                        }
                    },
                    {
                        path: "services"
                    },
                    {
                        path: "facilities"
                    }
                ],
            })
        // Kiểm tra nếu `data` tồn tại và không phải là một đối tượng rỗng
        return res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        // console.log(error);
        return res.json({
            success: false,
            message: "Error in get Email",
        });
    }
};
export const updateStatus = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                success: false,
                message: "Booking ID is required",
            });
        }
        // console.log(req.body);
        // Tìm và cập nhật booking theo ID
        let updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, // ID của booking cần cập nhật
            {status:"Confirm"}, // Dữ liệu cần cập nhật
            { new: true, runValidators: true } // Trả về bản ghi đã cập nhật và chạy validate
        );
        updatedBooking = await updatedBooking.populate({
            path: "roomType", // Populate roomType
            populate: [
                {
                    path: "hotel",
                    populate: {
                        path: "policy",
                    },
                }
            ],
        });
        // Kiểm tra nếu không tìm thấy booking
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

export const updateBooking = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                success: false,
                message: "Booking ID is required",
            });
        }
        // console.log(req.body);
        // Tìm và cập nhật booking theo ID
        let updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, // ID của booking cần cập nhật
            req.body, // Dữ liệu cần cập nhật
            { new: true, runValidators: true } // Trả về bản ghi đã cập nhật và chạy validate
        );

        console.log(updatedBooking,1);
        console.log(req.body,2);

        // Kiểm tra nếu không tìm thấy booking
        if (!updatedBooking) {
            return res.status(200).json({
                success: false,
                message: "Booking not found",
            });
        }
        // console.log(req.body);
        if(req.body.status==="Pending"){
            updatedBooking = await updatedBooking.populate({
                path: "roomType", // Populate roomType
                populate: [
                    {
                        path: "hotel",
                        
                    },
                  
                ],
            });
            await sendMail({
                email: updatedBooking.email,
                subject: `[HighlightsOfVietnam] Payment Successful – ${updatedBooking.roomType.hotel.name}`,
                html: `
                  <html>
                    <head>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          background-color: #f9f9f9;
                          color: #333;
                          margin: 0;
                          padding: 0;
                        }
                        .email-container {
                          width: 100%;
                          max-width: 600px;
                          margin: 20px auto;
                          background-color: #ffffff;
                          padding: 20px;
                          border-radius: 8px;
                          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                          color: #4CAF50;
                          text-align: center;
                          font-size: 24px;
                          margin-bottom: 20px;
                        }
                        p {
                          font-size: 16px;
                          line-height: 1.6;
                          color: #555;
                        }
                        .highlight {
                          font-weight: bold;
                          color: #4CAF50;
                        }
                        .details {
                          margin: 20px 0;
                          padding: 15px;
                          background-color: #f4f4f4;
                          border-radius: 8px;
                        }
                        .details ul {
                          list-style: none;
                          padding: 0;
                          margin: 0;
                        }
                        .details ul li {
                          margin-bottom: 10px;
                          font-size: 14px;
                          color: #333;
                        }
                        .details ul li span {
                          font-weight: bold;
                          color: #4CAF50;
                        }
                        .footer {
                          text-align: center;
                          margin-top: 20px;
                          font-size: 14px;
                          color: #777;
                        }
                        .footer a {
                          color: #4CAF50;
                          text-decoration: none;
                        }
                        .button {
                          display: inline-block;
                          background-color: #4CAF50;
                          color: white;
                          padding: 10px 20px;
                          font-size: 16px;
                          text-decoration: none;
                          border-radius: 5px;
                          margin-top: 20px;
                          text-align: center;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="email-container">
                        <h1>Booking Successful</h1>
                        <p>Dear <strong>${req.body.name}</strong>,</p>
                        <p>Thank you for your payment and for choosing <strong>Highlights of Vietnam</strong>.</p>
                        <p>We’re pleased to let you know that your payment of <span class="highlight">$${new Intl.NumberFormat("en-US").format(updatedBooking.totalPriceUSD)}</span> has been successfully received. Your booking request is currently being <span class="highlight">reviewed</span> by our admin team. You will receive a <span class="highlight">confirmation email</span> once your booking has been approved.</p>
                        <div class="details">
                          <h3>Booking Details</h3>
                          <ul>
                            <li><span>Booking ID:</span> ${updatedBooking?._id}</li>
                            <li><span>Guest Name:</span> ${req.body.name}</li>
                            <li><span>Email:</span> ${updatedBooking?.email}</li>
                            <li><span>Phone Number:</span> ${updatedBooking?.phoneNumber || "N/A"}</li>
                            <li><span>Number of Guests:</span> ${updatedBooking?.guests}</li>
                            <li><span>Check-in Date:</span> ${new Date(updatedBooking?.checkIn).toDateString()}</li>
                            <li><span>Check-out Date:</span> ${new Date(updatedBooking?.checkOut).toDateString()}</li>
                            <li><span>Room Type:</span> ${updatedBooking.roomType.RoomType}</li>
                            <li><span>Home Nmae:</span> ${updatedBooking.roomType.hotel.name}</li>
                            <li><span>Payment Method:</span> ${updatedBooking.paymentMethod || "N/A"}</li>
                            <li><span>Total Amount Paid:</span> $${new Intl.NumberFormat("en-US").format(updatedBooking.totalPriceUSD)}</li>
                            <li><span>Message for Host:</span> ${updatedBooking.request || "N/A"}</li>
                          </ul>
                        </div>
                        <p>You can <a href="http://localhost:5173/order/${updatedBooking._id}" class="button">View your booking here</a> for the full details or to check its latest status.</p>
                        <p>If you have any questions or updates regarding your booking, feel free to reach out. We’re always here to help make your stay as enjoyable as possible.</p>
                        <p class="footer">Warm regards, <br> <strong>Highlights of Vietnam Team</strong></p>
                      </div>
                    </body>
                  </html>
                `,
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

export const getAllBooking = async (req, res) => {
    try {
        // console.log(req.params);
        // console.log("vao day");
        const data = await Booking.find({}).sort({createdAt:-1})
            .populate({
                path: "roomType", // Populate roomType
                populate: [
                    {
                        path: "hotel",
                        populate: {
                            path: "policy"
                        }
                    },
                    {
                        path: "services"
                    },
                    {
                        path: "facilities"
                    }
                ],
            })
        // Kiểm tra nếu `data` tồn tại và không phải là một đối tượng rỗng
        return res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error in BE",
        });
    }
};