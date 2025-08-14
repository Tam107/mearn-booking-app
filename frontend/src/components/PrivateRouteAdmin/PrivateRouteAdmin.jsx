import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminLayout from "../AdminLayout/AdminLayout.jsx"; // import layout admin

const PrivateRouteAdmin = ({ children }) => {
  const { isAdmin, loading } = useSelector((state) => state.AdminReducer);

  // Đang loading
  if (loading) {
    return <Skeleton active />;
  }

  // Chưa đăng nhập admin
  if (!isAdmin) {
    return <Navigate to="/loginAdmin" />;
  }

  // Đã đăng nhập => bọc nội dung bằng AdminLayout
  return <AdminLayout>{children}</AdminLayout>;
};

export default PrivateRouteAdmin;
