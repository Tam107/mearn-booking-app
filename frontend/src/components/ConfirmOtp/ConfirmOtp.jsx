import { Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router'
import Cookies from 'js-cookie';  // Import thư viện js-cookie
import { checkTokenOtp } from '../../../Axios/client/api';

const ConfirmOtp = ({otp,setOtp}) => {

  const [form] = Form.useForm()
  const navigate = useNavigate();  // Để điều hướng trang

  const handleFinish = async(e)=>{
     const res =await checkTokenOtp(e)
     if(res.success){   
        toast.success(res.message)
        navigate(`/login`)
     }
     else{
        toast.error(res.message)
        if(res.code === 401){
            navigate(`/register`)
        }
        form.resetFields()
     }
  }
  

  return (
    <>
        <div className={"bg-[#EEF2FF]  w-full h-[100px] mt-3"}>
        </div>
        <div className='w-full  my-3'>
            <div className={"w-[60%] px-4 shadow-xl rounded-2xl mb-[30px] py-3 pb-5  mx-auto"}>
                <div className='flex flex-col items-center gap-4'>
                    <h2 className='font-[600] text-[48px] leading-[48px]'>Verify Email</h2>
                    <p className='font-[400] text-[14px] leading-[20px] text-[#6B7280]'>Welcome to our blog magazine Community</p>
                </div>
                <br />
                <br />
                <div className='w-[60%]  mx-auto'>
                <Form form={form} onFinish={handleFinish} layout='vertical'>
                        <Form.Item rules={[{required:true,message:"Email is required!"}]} name="otp"  label={<div className='font-[500] text-[14px] leading-[20px] text-[#374151]'>OTP code</div>}>
                            <Input.Password
                                placeholder="********"
                                type='text'
                                className='text-[#6B7280] font-[400] text-[16px] leading-[24px] !rounded-2xl !py-2 !px-3'
                            />
                        </Form.Item>
                        
                        
                        <Form.Item  >
                            <button className=' cursor-pointer w-full bg-[#4F46E5] rounded-4xl py-3 flex items-center justify-center text-white font-[500] text-[16px] leading-[24px] '>Continute</button>
                                   
                        </Form.Item>
                        <div className={"w-full text-center mt-[10px]"}>
                            <p  className={"font-[400] text-[16px] leading-[24px]"}>Go back for <Link to={"/login"} className={"text-[#3730A3]"}>Sign In</Link> / <Link to={"/register"} className={"text-[#3730A3]"}>Sign up</Link></p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConfirmOtp
