const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth'); // Import googleAuth.js

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/auth', authRoutes);

// 🟢 Thêm route xử lý OAuth callback
app.get('/oauth', authRoutes.handleOAuthCallback);

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
