import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import ConfirmOtp from '../../components/ConfirmOtp/ConfirmOtp'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const ConfirmOtpPage = ({otp,setOtp}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!otp){
      toast.error("Please register first", {
        style: {
          maxWidth: 500
        },
        duration:3000
      });
      navigate(`/register`)
    }
    
  }, [otp]);
  return (
    <>
        <Header/>
        <ConfirmOtp otp={otp} setOtp={setOtp}/>
    </>
  )
}

export default ConfirmOtpPage
