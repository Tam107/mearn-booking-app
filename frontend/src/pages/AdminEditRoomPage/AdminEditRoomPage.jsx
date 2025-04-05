import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import AdminEditRoomDetail from "../../components/AdminEditRoomDetail/AdminEditRoomDetail";

const AdminEditRoomPage = () => {
  return (
    <>
      <div className="flex">
        <SidebarAdmin />
        <div className="w-full">
          {/* <AdminCreateBus/> */}
          <HeaderAdmin />

          <AdminEditRoomDetail />
        </div>
      </div>
    </>
  );
};

export default AdminEditRoomPage;
