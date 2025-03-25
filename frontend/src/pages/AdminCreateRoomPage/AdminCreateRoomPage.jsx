import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import AdminCreateRoom from '../../components/AdminCreateRoom/AdminCreateRoom'

const AdminCreateRoomPage = () => {
  return (
    <div className="flex">
    <SidebarAdmin />
    <div className="w-full">
        {/* <AdminCreateBus/> */}
        <HeaderAdmin/>

        <AdminCreateRoom/>
        
       
        
    </div>
</div>
  )
}

export default AdminCreateRoomPage
