import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminLayout from "../AdminLayout/AdminLayout.jsx"; // import layout admin
import { getAllArrivalPointAdminAction, getAllBoardingPointAdminAction, getAllBusesAdminAction } from "../../redux/actions/BusAction.js";
import Store from "../../redux/store.js";

const PrivateRouteAdmin = ({ children }) => {
  const { isAdmin, loading } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const { stateBus } = useSelector((state) => state.BusReducer); 

  useEffect(() => {
    if (!stateBus?.boardingPointsAdmin) {  
      Store.dispatch(getAllBoardingPointAdminAction());              
      Store.dispatch(getAllArrivalPointAdminAction());              
      Store.dispatch(getAllBusesAdminAction());              
    }
  }, [dispatch, isAdmin, stateBus]);

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
