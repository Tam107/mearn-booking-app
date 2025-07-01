import nodemailer from "nodemailer"
import dotenv from "dotenv"
import {SMPT_HOST, SMPT_PORT, SMPT_PASSWORD, SMPT_MAIL, SMPT_SERVICE} from "../config/env.js";

dotenv.config()

export const sendMail =async (options)=>{
    const transporter = nodemailer.createTransport({
        host: SMPT_HOST,
        port: SMPT_PORT,
        service: SMPT_SERVICE, // true for port 465, false for other ports
        auth: {
          user: SMPT_MAIL,
          pass:SMPT_PASSWORD,
        },
      });

    const mailOptions = {
        from: SMPT_MAIL,
        to: options.email, // list of receivers
        subject:options.subject, // Subject line
        text: options.text || "", // Nội dung dạng văn bản thuần
        html: options.html || "",
      
    };

    await transporter.sendMail(mailOptions)
      
}
