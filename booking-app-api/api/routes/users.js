import express from "express";
import {deleteUser, getAllUsers, getUser, updateUser} from "../controller/userController.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";

const router = express.Router();


// check authen
router.get("/checkAuthenticated", verifyToken, (req, res, next) => {
    res.send("Hello user, you're login")
});

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