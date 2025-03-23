import { useEffect, useState } from 'react'
import { Routes,Route} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './App.css'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HotelDetailPage from './pages/HotelDetailPage/HotelDetailPage.jsx';
import PackageTourPage from './pages/PackageTourPage/PackageTourPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import ConfirmOtpPage from './pages/ConfirmOtpPage/ConfirmOtpPage.jsx';
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
       <Route path="/login"  element={<LoginPage  otp={otp} setOtp={setOtp}/>}/>
       <Route path="/register"   element={<RegisterPage otp={otp} setOtp={setOtp}/>}/>
       <Route path="/confirmOtp"   element={<ConfirmOtpPage otp={otp} setOtp={setOtp}/>}/>
       <Route path="/hotel/:slug" element={<HotelDetailPage/>}/>
       <Route path="/packageTour/:slug" element={<PackageTourPage/>}/>
       <Route path="/admin-create" element={<AdminCreatePage/>}/>
       <Route path="/loginAdmin" element={<LoginAdminPage />} />
       <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/dashboard-create-bus" element={<AdminCreateBusPage />} />
       <Route path='/dashboard-create-hotel' element={<AdminCreateHotelPage/>}/>
       <Route path='/dashboard-view-room' element={<AdminViewRoomPage/>}/>
       <Route path='/dashboard-view-roomDetail/:slug' element={<AdminViewRoomDetailPage/>}/>
       <Route path="/hotel" element={<HotelListPage />} />
       
       {/* <Route path="/hotel" element={<HotelDetailPage/>}/> */}
      </Routes>
      
    </>
  )
}

export default App
