import { Input,Form } from 'antd'
import React from 'react'
import { RxAvatar } from 'react-icons/rx'
import {  Link } from 'react-router'
import { createAdmin } from '../../../Axios/client/api'
import toast from 'react-hot-toast'

const AdminCreatePage = () => {
    const [form] = Form.useForm();
    const handleFinish = async(values) => {
        const res = await createAdmin(values)
        if(res.success){
            toast.success(res.message) 
        }
    };

  return (
    <>
        <div className='min-h-screen  bg-gray-50 flex flex-col  sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Register </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
                    <Form form={form} onFinish={handleFinish} layout='vertical'>
                        <Form.Item rules={[{required:true,message:"Shop name is required!"}]} name="username"  label={<div className='text-sm text-medium text-gray-700'>Username</div>}>
                            <Input
                                // placeholder="Username"
                                // autoComplete="email"  
                                // type='email'
                            />

                            
                        </Form.Item>
                        <Form.Item rules={[{required:true,message:"Phone number is required!"}]} name="phoneNumber"  label={<div className='text-sm text-medium text-gray-700'>Phone number</div>}>
                            <Input
                                // placeholder="Username"
                                // autoComplete="email"  
                                // type='email'
                            />
                            
                        </Form.Item>
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
                        <div className='mb-5'>
                            <label htmlFor='avatar' className='block text-sm font-medium text-gray-700'>
                            </label>
                            <div className='flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                    {/* {
                                        avatar?
                                        (
                                            <img src={URL.createObjectURL(avatar)} alt="avatar" className='h-full w-full object-cover rounded-full' />
                                        )
                                        :
                                        (   
                                            <RxAvatar className='h-8 w-8'/>
                                        )

                                    } */}
                                    <RxAvatar className='h-8 w-8'/>
                                </span>
                                <label htmlFor='file-input' className='flex ml-3 transition-all items-center justify-center px-4 py-2 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100'>
                                    <span>Upload an avatar</span>
                                    <input type="file" name="avatar" id="file-input" accept='.jpg,.jpeg,.png' className="sr-only"/>
                                </label>
                            </div>
                        </div>

                        

                       

                        <Form.Item  >
                            <button  className={'group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 transition duration-300' } htmltype="submit">Submit</button>       
                            
                        </Form.Item>
                        
                        <div className='flex items-center w-full justify-center'>
                            <h4>Already have an account?</h4>
                            <Link to={"/loginAdmin"} className='pl-2 text-blue-600'>Sign in</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminCreatePage
