import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import AdminViewRoomDetail from '../../components/AdminViewHotelDetail/AdminViewRoomDetail'

const AdminViewRoomDetailPage = () => {
  return (
    <>
     
    <div className="flex">
        <SidebarAdmin />
        <div className="w-full">
            {/* <AdminCreateBus/> */}
            <HeaderAdmin/>

            <AdminViewRoomDetail/>
        
            
        
            
        </div>
    </div>
    </>

 )
}

export default AdminViewRoomDetailPage
