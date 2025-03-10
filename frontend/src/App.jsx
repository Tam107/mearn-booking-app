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

function App() {

  const [otp,setOtp] = useState('');
  const stateAuth = useSelector(state=>state.UserReducer)
  // console.log(stateSeller);
  useEffect(()=>{
    const fetchApi = async()=>{
      Store.dispatch(loadUserAction())
      Store.dispatch(loadAdminAction())

    
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
       {/* <Route path="/hotel" element={<HotelDetailPage/>}/> */}
      </Routes>
      
    </>
  )
}

export default App
