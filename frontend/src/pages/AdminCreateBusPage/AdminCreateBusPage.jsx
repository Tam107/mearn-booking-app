import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import AdminCreateBus from "../../components/AdminCreateBus/AdminCreateBus";

const AdminCreateBusPage = () => {
  return (
    <>
     
        <div className="flex">
            <SidebarAdmin />
            <div className="w-full">
                <AdminCreateBus/>
            </div>
        </div>
    
    </>
  );
};

export default AdminCreateBusPage;
