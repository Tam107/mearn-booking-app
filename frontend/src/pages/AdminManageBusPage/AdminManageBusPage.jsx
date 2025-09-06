import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import AdminManageBus from "../../components/AdminManageBus/AdminManageBus";

const AdminManageBusPage = () => {
  return (
    <>
     
        <div className="flex">
            <SidebarAdmin />
            <div className="w-full">
                <AdminManageBus/>
            </div>
        </div>
    
    </>
  );
};

export default AdminManageBusPage;
