import React, { useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import AdminViewOrders from "../../components/AdminViewOrders/AdminViewOrders";

const AdminViewOrdersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminViewOrders />
  );
};

export default AdminViewOrdersPage;
