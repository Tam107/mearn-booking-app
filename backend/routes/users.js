import express from "express";
import {deleteUser, getAllUsers, getUser, updateUser,register,checkOtp,login} from "../controller/userController.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";
import {registerUserValidate,loginUserValidate} from "../validate/user.js";
import multer from "multer";
import {uploadImageToCloudinary} from "../middlewares/uploadImageToCloudinary.js";

const upload = multer({ storage: multer.memoryStorage() }); 

const router = express.Router();

router.post('/register',upload.single("file"),uploadImageToCloudinary,registerUserValidate,register)
router.post('/check-otp',checkOtp)
router.post('/login',loginUserValidate,login)
router.get("/get-user-verify",verifyToken,getUser)





router.post("/logout", (req, res) => {
    res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "none" }) // ✅ Securely clear the cookie
        .status(200)
        .json({ message: "Logged out successfully" });
});


// check user
router.get("/check/:id",verifyUser ,(req, res, next) => {
    res.send("Hello user, you're login and can delete your account")
})

router.get("/admin/:id",verifyAdmin ,(req, res, next) => {
    res.send("Hello user, you're login and can delete all accounts")
})


//update - ok
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);


//get id
router.get("/:id", getUser)

//get all
router.get("/", getAllUsers)


export default router;