import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import AdminViewEditHotel from '../../components/AdminViewEditHotel/AdminViewEditHotel'

const AdminViewEditHotelPage = () => {
  return (
    <div className="flex">
    <SidebarAdmin />
    <div className="w-full">
        {/* <AdminCreateBus/> */}
        <HeaderAdmin/>

        <AdminViewEditHotel/>
        
       
        
    </div>
</div>
  )
}

export default AdminViewEditHotelPage
