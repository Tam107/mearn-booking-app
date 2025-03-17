import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';  // Giữ App.jsx làm trang đăng nhập
import Dashboard from './Dashboard';

const MainApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Chuyển hướng nếu URL không hợp lệ */}
            </Routes>
        </Router>
    );
};

export default MainApp;
