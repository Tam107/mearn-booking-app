import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import AdminCreateHotel from '../../components/AdminCreateHotel/AdminCreateHotel'

const AdminCreateHotelPage = () => {
  return (
    <div className="flex">
    <SidebarAdmin />
    <div className="w-full">
        {/* <AdminCreateBus/> */}
        <HeaderAdmin/>

        <AdminCreateHotel/>
        
       
        
    </div>
</div>
  )
}

export default AdminCreateHotelPage
