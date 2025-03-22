import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import AdminViewRoom from "../../components/AdminViewRoom/AdminViewRoom";

const AdminViewRoomPage = () => {
  return (
    <>
      <div className="flex">
        <SidebarAdmin />
        <div className="w-full">
          {/* <AdminCreateBus/> */}
            <HeaderAdmin />

            <AdminViewRoom/>
        </div>
      </div>
    </>
  );
};

export default AdminViewRoomPage;
