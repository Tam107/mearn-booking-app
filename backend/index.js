import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routes/users.js"; // Keep .jsx if necessary
import serviceHotelRoute from "./routes/serviceHotel.js"; // Keep .jsx if necessary
import facilityHotel from "./routes/facilityHotel.js"; // Keep .jsx if necessary
import uploadRoute from "./routes/upload.js"; // Keep .jsx if necessary
import policyRoute from "./routes/policy.js"; // Keep .jsx if necessary
import BookingRoute from "./routes/Booking.js"; // Keep .jsx if necessary
import hotelsRoute from "./routes/hotels.js"; // Keep .jsx if necessary
import adminsRoute from "./routes/admin.js"; // Keep .jsx if necessary
import roomsRoute from "./routes/rooms.js";
import swaggerDocs from "./swagger.js";
import cookieParser from "cookie-parser"; // Keep .jsx if necessary
import cors from "cors";
import googleAuthRoute from "./routes/googleAuth.js";
import {PORT, MONGO_URI, CLIENT_ID_PAYPAL, PORT_FRONTEND} from "./config/env.js";

const app = express();
dotenv.config();

// Set strictQuery option
mongoose.set('strictQuery', true); // or false, depending on your needs

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        // console.log("Connected to MongoDB");
    } catch (e) {
        // console.log("Error connecting to mongoose", e);
    }
};
// Call the connect function
connect();

mongoose.connection.on("disconnected",()=>{
    console.log(" Disconnected to MongoDB");
} );

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(cors({
//     origin:PORT_FRONTEND,
//     credentials:true
// }))

app.use(cors({
    origin: [
        'https://highlightsofvietnam.pages.dev',
        'https://highlightsofvietnamm.vercel.app',
        'http://localhost:5173', // hoặc port development của bạn
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}));

// route
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/admin", adminsRoute);
app.use("/api/auth", googleAuthRoute);
app.use("/api/servicesHotel", serviceHotelRoute);
app.use("/api/facilityHotel", facilityHotel);
app.use("/api/upload", uploadRoute);
app.use("/api/policy", policyRoute);
app.use("/api/booking", BookingRoute);
app.use("/api/config/paypal", (req,res)=>{
    res.send(CLIENT_ID_PAYPAL)
});


app.use((error, req, res, next)=>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        // stack: error.stack,
    });
})


app.listen(PORT, () => {
    console.log(`App listening on 8080`);
    console.log("PORT: ",PORT)
    console.log("PORT_FRONTEND: ",PORT_FRONTEND)
    swaggerDocs(app, PORT); // Initialize Swagger
});
