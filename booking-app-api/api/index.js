import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; // Keep .jsx if necessary
import usersRoute from "./routes/users.js"; // Keep .jsx if necessary
import hotelsRoute from "./routes/hotels.js"; // Keep .jsx if necessary
import roomsRoute from "./routes/rooms.js"; // Keep .jsx if necessary

const app = express();
dotenv.config();

// Set strictQuery option
mongoose.set('strictQuery', true); // or false, depending on your needs


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log("Error connecting to mongoose", e);
    }
};
// Call the connect function
connect();

mongoose.connection.on("disconnected",()=>{
    console.log(" Disconnected to MongoDB");
} );

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// route
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((error, req, res, next)=>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack,
    });
})

app.listen(8080, () => {
    console.log(`App listening on 8080`);
});
