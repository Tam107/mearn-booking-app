import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import AdminViewOrders from '../../components/AdminViewOrders/AdminViewOrders'

const AdminViewOrdersPage = () => {
  return (
    <>
        <div className="flex">
    <SidebarAdmin />
    <div className="w-full">
        {/* <AdminCreateBus/> */}
        <HeaderAdmin/>
        <AdminViewOrders/>

        {/* <AdminViewEditHotel/> */}
        
       
        
    </div>
</div>
    </>
  )
}

export default AdminViewOrdersPage
