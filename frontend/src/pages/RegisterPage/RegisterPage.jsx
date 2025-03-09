import React, { useEffect } from 'react'
import Register from '../../components/Register/Register'
import Header from '../../components/Header/Header'
import { useSelector } from 'react-redux'

const RegisterPage = ({otp,setOtp}) => {
  const {isAuthenticated} = useSelector(state=>state.UserReducer)
  const check = ()=>{
    if(isAuthenticated){
        navigate("/")
    }
}
useEffect(()=>{check()},[])
  return (
    <>
        <Header/>
        <Register otp={otp} setOtp={setOtp}/>
    </>
  )
}

export default RegisterPage
