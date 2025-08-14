import { useEffect, useState } from 'react'
import { Routes,Route} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './App.css'
import HomePage from './pages/HomePage/HomePage';
import HotelDetailPage from './pages/HotelDetailPage/HotelDetailPage.jsx';
import PackageTourPage from './pages/PackageTourPage/PackageTourPage.jsx';
import { useSelector } from "react-redux";
import Store from "./redux/store"
import { loadUserAction } from './redux/actions/UserAction.js';
import AdminCreatePage from './pages/AdminCreatePage/AdminCreatePage.jsx';
import LoginAdminPage from './pages/LoginAdminPage/LoginAdminPage.jsx';
import { loadAdminAction } from './redux/actions/AdminAction.js';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import AdminCreateBusPage from './pages/AdminCreateBusPage/AdminCreateBusPage.jsx';
import HotelListPage from './pages/HotelListPage/HotelListPage.jsx';
import AdminCreateHotelPage from './pages/AdminCreateHotelPage/AdminCreateHotelPage.jsx';
import AdminViewRoomPage from './pages/AdminViewRoomPage/AdminViewRoomPage.jsx';
import { getAllHotelsAction } from './redux/actions/HotelAction.js';
import { getAllRoomsAction } from './redux/actions/RoomAction.js';
import AdminViewRoomDetailPage from './pages/AdminViewRoomDetailPage/AdminViewRoomDetailPage.jsx';
import AdminViewHotelPage from './pages/AdminViewHotelPage/AdminViewHotelPage.jsx';
import AdminViewEditHotelPage from './pages/AdminViewEditHotelPage/AdminViewEditHotelPage.jsx';
import AdminCreateRoomPage from './pages/AdminCreateRoomPage/AdminCreateRoomPage.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import AdminEditRoomPage from './pages/AdminEditRoomPage/AdminEditRoomPage.jsx';
import BookingPage from './pages/BookingPage/BookingPage.jsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage.jsx';
import OrderListPage from './pages/OrderListPage/OrderListPage.jsx';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage.jsx';
import AdminViewOrdersPage from './pages/AdminViewOrdersPage/AdminViewOrdersPage.jsx';
import PrivateRouteAdmin from './components/PrivateRouteAdmin/PrivateRouteAdmin.jsx';
import BusPage from './pages/BusPage/BusPage.jsx';

function App() {

  const [otp,setOtp] = useState('');
  const stateAuth = useSelector(state=>state.UserReducer)
  const stateHotels = useSelector(state=>state.HotelReducer)
  
  useEffect(()=>{
    const fetchApi = async()=>{
      Store.dispatch(loadUserAction())
      Store.dispatch(loadAdminAction())
      Store.dispatch(getAllHotelsAction())
      Store.dispatch(getAllRoomsAction())

    
    }
    fetchApi()


  },[])
  // console.log(stateAuth);


  return (
    <>
      <Toaster />
      <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/homes/:slug" element={<HotelDetailPage/>}/>
       <Route path="/packageTour/:slug" element={<PackageTourPage/>}/>
       <Route path="/admin-create" element={<AdminCreatePage/>}/>
       <Route path="/loginAdmin" element={<LoginAdminPage />} />
       <Route
    path="/dashboard"
    element={<PrivateRouteAdmin><DashboardPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-create-bus"
    element={<PrivateRouteAdmin><AdminCreateBusPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-create-room"
    element={<PrivateRouteAdmin><AdminCreateRoomPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-create-home"
    element={<PrivateRouteAdmin><AdminCreateHotelPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-view-room"
    element={<PrivateRouteAdmin><AdminViewRoomPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-view-homes"
    element={<PrivateRouteAdmin><AdminViewHotelPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-view-bus"
    element={<PrivateRouteAdmin><AdminViewHotelPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-hotel/:slug"
    element={<PrivateRouteAdmin><AdminViewEditHotelPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-view-roomDetail/:slug"
    element={<PrivateRouteAdmin><AdminViewRoomDetailPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-edit-roomDetail/:slug"
    element={<PrivateRouteAdmin><AdminEditRoomPage /></PrivateRouteAdmin>}
  />
  <Route
    path="/dashboard-view-orders/"
    element={<PrivateRouteAdmin><AdminViewOrdersPage /></PrivateRouteAdmin>}
  />
       
       <Route path="/homes" element={<HotelListPage />} />
       <Route path="/bus" element={<BusPage />} />
       <Route path="/booking/:id" element={<BookingPage />} />
       <Route path="/payment/:id" element={<PaymentPage />} />
       <Route path="/orderSuccess/:id" element={<OrderSuccessPage />} />
       <Route path="/orderList" element={<OrderListPage />} />
       <Route path="/order/:id" element={<OrderDetailPage />} />
       <Route path="*" element={<PageNotFound />} />
       
       {/* <Route path="/hotel" element={<HotelDetailPage/>}/> */}
      </Routes>
      
    </>
  )
}

export default App
