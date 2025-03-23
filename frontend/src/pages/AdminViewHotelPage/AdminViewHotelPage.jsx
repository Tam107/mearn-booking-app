import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import AdminViewHotel from '../../components/AdminViewHotel/AdminViewHotel'

const AdminViewHotelPage = () => {
  return (
    <>
    <div className="flex">
      <SidebarAdmin />
      <div className="w-full">
        {/* <AdminCreateBus/> */}
          <HeaderAdmin />

          <AdminViewHotel/>
      </div>
    </div>
  </>
  )
}

export default AdminViewHotelPage
