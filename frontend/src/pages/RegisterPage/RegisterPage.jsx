import React, { useEffect } from 'react'
import Register from '../../components/Register/Register'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import toast from 'react-hot-toast'

const RegisterPage = ({otp,setOtp}) => {
  const {isAuthenticated} = useSelector(state=>state.UserReducer)
  const check = ()=>{
    if(isAuthenticated){
        navigate("/")
    }
}
const location = useLocation();

useEffect(()=>{check()},[])
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const err = params.get("error");

  if (err) {
   toast.error("Please Register first")
  }
}, [location.search]); // Chạy lại khi URL thay đổi


  return (
    <>
        <Header/>
        <Register otp={otp} setOtp={setOtp}/>
    </>
  )
}

export default RegisterPage
