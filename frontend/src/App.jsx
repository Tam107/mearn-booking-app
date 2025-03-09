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

function App() {

  const [otp,setOtp] = useState('');
  const stateAuth = useSelector(state=>state.UserReducer)
  // console.log(stateSeller);
  useEffect(()=>{
    const fetchApi = async()=>{
      Store.dispatch(loadUserAction())

    
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
      </Routes>
      
    </>
  )
}

export default App
