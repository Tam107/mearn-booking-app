const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Hàm helper lấy thông tin user từ Google API
async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    return await response.json();
}

// Route login để chuyển hướng đến Google OAuth
router.get('/login', (req, res) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'openid'
        ],
        prompt: 'consent'
    });
    res.redirect(authorizeUrl);
});

// 🟢 Hàm xử lý OAuth Callback từ Google
const handleOAuthCallback = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error('No authorization code provided');

        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);

        const userData = await getUserData(tokens.access_token);

        // 🟢 Chuyển hướng đến frontend với token
        res.redirect(`http://localhost:5173/?token=${tokens.access_token}`);
    } catch (error) {
        console.error('OAuth error:', error);
        res.redirect('http://localhost:5173/?error=auth_failed');
    }
};

// 🟢 Xuất cả router và hàm callback
module.exports = router;
module.exports.handleOAuthCallback = handleOAuthCallback;
