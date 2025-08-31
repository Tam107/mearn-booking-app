import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import AdminCreateBus from "../../components/AdminCreateBus/AdminCreateBus";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AdminEditBus from "../../components/AdminEditBus/AdminEditBus";

const AdminEditBusPage = () => {
  const {id} = useParams()
  const [data,setData] = useState()
  const stateBus = useSelector(state=>state.BusReducer)
  const navigate  = useNavigate()
  const getData = ()=>{
    const tmp  = stateBus?.busesAdmin?.find(i=>i._id == id)
    if(tmp ===-1) {
      toast.error("Can not find bus!")
      navigate("/dashboard")
      return;
    }
    setData({
      ...tmp,
      boarding:tmp.boarding?.map(i=>i._id),
      arrival:tmp.arrival?.map(i=>i._id),
      facilities:tmp.facilities?.map(i=>i._id)
    });
  }
  useEffect(()=>{
    getData();
  },[id])
  
  
  return (
    <>
     
        <div className="flex">
            <SidebarAdmin />
            <div className="w-full">
                <AdminEditBus data={data} setData={setData}/>
            </div>
        </div>
    
    </>
  );
};

export default AdminEditBusPage;
