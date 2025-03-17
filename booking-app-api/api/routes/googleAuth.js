import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { sendToken } from "../helpers/JsonToken.js";

const router = express.Router();

console.log("GOOGLE_CLIENT_ID from env:", process.env.GOOGLE_CLIENT_ID); // Debug
const oAuth2Client = new OAuth2Client(
    "1021003224063-gprhsennt0tv0rl9bhc3ifh74sc4kobc.apps.googleusercontent.com",
    "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",
    "http://localhost:8080/api/auth/oauth" // http://localhost:8080/api/auth/oauth
);

async function getUserData(access_token) {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    return await response.json();
}

// Google login route
router.get("/login", (req, res) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
        ],
        prompt: "consent",
    });
    res.redirect(authorizeUrl);
});

// Google callback route
router.get("/oauth", async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error("No authorization code provided");

        // Exchange authorization code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        const userData = await getUserData(tokens.access_token);

        // Check if user exists, if not create new user
        let user = await User.findOne({ email: userData.email });
        if (!user) {
            user = new User({
                username: userData.name,
                email: userData.email,
                googleId: userData.sub,
                avatar: userData.picture,
                password: null,
            });
            await user.save();
        } else {
            // Optional: Update fields if they differ
            user.username = userData.name;
            user.avatar = userData.picture;
            await user.save();
        }

        // Set token cookie and redirect to dashboard
        user.password = "";
        const token = user.getJwtToken();
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };
        res.status(200)
            .cookie("token", token, options)
            .redirect("http://localhost:5173");
    } catch (error) {
        console.error("Google OAuth error:", error);
        res.redirect("http://localhost:5173?error=auth_failed");
    }
});

export default router;