import { Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { loginAdminApi } from '../../../Axios/client/api'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdminAction } from '../../redux/actions/AdminAction'

const LoginAdminPage = () => {
    const dispatch = useDispatch()
    const stateAdmin = useSelector(state=>state.AdminReducer)
    const navigation = useNavigate()
    useEffect(()=>{
        if(stateAdmin.isAdmin){
            navigation("/")
        }
    }
    ,[dispatch,stateAdmin])
    const hanldeFinish = async(e)=>{
        const res = await loginAdminApi(e)
        if(res.success){
            toast.success(res.message)
            console.log(res)
            dispatch(loginAdminAction(res.data))
        }
        else{
            toast.error(res.message)
        }
    }
  return (
   <>
    <div className='min-h-screen py-24 bg-gray-50 flex flex-col  sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Login to your dashboard</h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
                    <Form onFinish={hanldeFinish} layout='vertical'>
                        <Form.Item rules={[{required:true,message:"Email address is required!"}]} name="email"  label={<div className='text-sm text-medium text-gray-700'>Email address</div>}>
                            <Input
                                // placeholder="Username"
                                autoComplete="email"  
                                type='email'
                            />
                            
                        </Form.Item>

                        <Form.Item rules={[{required:true,message:"Password is required!"}]} name="password"  label={<div className='text-sm text-medium text-gray-700'>Password</div>}>
                            <Input.Password
                                // placeholder="Username"
                                autoComplete="password"  
                          
                            />
                            
                        </Form.Item>

                        <div className='flex items-center justify-between '>
                            <Form.Item name="remember-me" valuePropName="checked" layout='horizontal' >
                                <Checkbox >Remember me</Checkbox>
                                
                            </Form.Item>

                            <Link className='text-sm font-medium text-blue-600 hover:text-blue-500 mb-[24px]'>Forgot your password?</Link>
                        </div>

                       

                        <Form.Item  >
                            <button className={'group relative bg-blue-500 w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  hover:bg-blue-700 transition duration-300 ' } htmltype="submit">Login</button>       
                            
                        </Form.Item>
                        <div className='flex items-center w-full justify-center'>
                            <h4>Not have any account?</h4>
                            <Link to={"/shop-create"} className='pl-2 text-blue-600'>Sign Up</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
   </>
  )
}

export default LoginAdminPage
