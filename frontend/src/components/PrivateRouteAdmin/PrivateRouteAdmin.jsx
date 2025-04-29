import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
  const { isAdmin, loading } = useSelector((state) => state.AdminReducer);

  // Nếu trạng thái đang tải, hiển thị Skeleton
  if (loading) {
    return <Skeleton active />;
  }

  // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
  if (!isAdmin) {
    return <Navigate to="/loginAdmin" />;
  }

  // Nếu đã xác thực, hiển thị nội dung con
  return <>{children}</>;
};

export default PrivateRouteAdmin;