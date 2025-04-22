
// import { populate } from "dotenv"
import Admin from "../models/Admin.js"
import Booking from "../models/Booking.js"
import { sendMail } from "../helpers/sendMail.js"
export const create = async (req, res) => {
    try {


        const booking = new Booking(req.body)
        await booking.save()
        return res.json({
            success: true,
            data: booking
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
        console.log(error);
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
        console.log(error);
        return res.json({
            success: false,
            message: "Error in BE",
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

        await sendMail({
            email: updatedBooking.email,
            subject: `[HighlightsOfVietnam] Booking Confirmation – ${updatedBooking.roomType.hotel.name}`,
            html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #4CAF50;
            text-align: center;
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
          <h1>Booking Confirmation</h1>
          <p>Dear <strong>${updatedBooking.name}</strong>,</p>
          <p>Thank you for choosing <strong>${updatedBooking.roomType.hotel.name}</strong> for your upcoming stay! We are delighted to confirm your booking.</p>
          <p>Here is a summary of your booking request:</p>
          <ul>
            <li><strong>Booking Code:</strong> ${updatedBooking._id}</li>
            <li><strong>Guest Name:</strong> ${updatedBooking.name}</li>
            <li><strong>Email:</strong> ${updatedBooking.email}</li>
            <li><strong>Phone Number:</strong> ${updatedBooking.phoneNumber}</li>
            <li><strong>Check-in Date:</strong> ${new Date(updatedBooking.checkIn).toLocaleDateString()}</li>
            <li><strong>Check-out Date:</strong> ${new Date(updatedBooking.checkOut).toLocaleDateString()}</li>
            <li><strong>Room Type:</strong> ${updatedBooking.roomType.RoomType}</li>
            <li><strong>Number of Guests:</strong> ${updatedBooking.guests}</li>
            <li><strong>Total Cost:</strong> $${new Intl.NumberFormat("en-US").format(updatedBooking.totalPriceUSD)}</li>
          </ul>
          
          <p>If you have any questions or need further assistance, please don’t hesitate to contact us. We’re always here to help make your stay as enjoyable as possible.</p>
          <p>We hope you have a <span class="highlight">wonderful experience</span> with us!</p>
          <p class="footer">Warm regards, <br> <strong>Highlights of Vietnam</strong></p>
        </div>
      </body>
    </html>
  `,
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

export const update = async (req, res) => {
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
                email: req.body.email,
                subject: `[HighlightsOfVietnam] Payment Confirmation for Your Hotel Booking - Booking ID ${req.params.id}`,
                html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
              }
              .email-container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #4CAF50;
                text-align: center;
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
              <h1>Payment Successful</h1>
              <p>Dear <strong>${req.body.name}</strong>,</p>
              <p>Thank you for your payment and for choosing <strong>Highlights of Vietnam</strong>.</p>
              <p>We’re pleased to inform you that your <span class="highlight">payment of $${new Intl.NumberFormat("en-US").format(updatedBooking.totalPriceUSD)}</span> has been successfully received. Your booking request is currently being <span class="highlight">reviewed</span> by our admin team. You will receive a <span class="highlight">confirmation email</span> once your booking has been approved.</p>
              <p>Please kindly wait while we verify your details. This usually takes a short while. If any clarification is needed, our team will reach out to you.</p>
              <p>Thank you for your patience!</p>
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

export const getAll = async (req, res) => {
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