import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";

const Login = () => {
    return (
        <>
            <div className={"bg-[#EEF2FF]  w-full h-[100px]"}>
                <div className={"absolute  top-[15%] w-full"}>
                    <div className={"w-[800px] mb-[30px]  mx-auto"}>
                        <div className={"w-full py-[10px]  rounded-[40px] shadow-lg  bg-white"}>
                            <div className={"my-[25px] w-full flex items-center justify-center flex-col gap-[10px]"}>
                                <h2 className='font-[600] text-[36px] leading-[40px] text-[#1F2937]'>Login</h2>
                                <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280]'>Welcome to our blog magazine Community</p>
                            </div>
                            <div className={"w-[50%] my-12 mx-auto"}>
                                <div className={"w-full flex flex-col items-center gap-[15px]"}>
                                    <div className={"px-[24px] flex items-center rounded-[16px] py-[12px] bg-[#F3F4F6] w-full"}>
                                        <FaFacebookSquare color="#3C5999" size={24} />

                                        <p className={"flex-1 flex items-center justify-center"}>Continue with Facebook</p>
                                    </div>
                                    <div className={"px-[24px] flex items-center rounded-[16px] py-[12px] bg-[#F3F4F6] w-full"}>
                                        <FcGoogle

                                             size={24} />

                                        <p className={"flex-1 flex items-center justify-center"}>Continue with Google</p>
                                    </div>
                                    <div className={"px-[24px] flex items-center rounded-[16px] py-[12px] bg-[#F3F4F6] w-full"}>
                                        <FaTwitter color="black" size={24} />

                                        <p className={"flex-1 flex items-center justify-center"}>Continue with Twitter</p>
                                    </div>

                                </div>
                                <br/>
                                <br/>
                                <div className={"w-full"}>
                                    <div className={"w-full h-[1px] bg-[#E5E7EB] relative"}>
                                        <div className={"px-[12px] bottom-[-10px] left-[45%] absolute bg-white"}><p className={"font-[500] text-[16px] leading-[24px]"}>OR</p></div>

                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className={"w-full"}>
                                    <form action="" className={"w-full flex flex-col  gap-[20px]"}>
                                        <div>
                                            <label className={"font-[500] mb-[5px]  pr-1 text-[14px] block leading-[20px]"} htmlFor="">Email <span className={"text-red-500"}>*</span></label>
                                            <input placeholder={"you@example.com"} type="text" className={"py-[9px] w-full px-[13px] border-[1px] border-[#D1D5DB] rounded-[16px] shadow-md"}/>
                                        </div>
                                        <div>
                                            <label className={"font-[500] mb-[5px] pr-1 text-[14px] block leading-[20px]"} htmlFor="">Password <span className={"text-red-500"}>*</span></label>
                                            <input placeholder={"****"} type="text" className={"py-[9px] w-full px-[13px] border-[1px] border-[#D1D5DB] rounded-[16px] shadow-md"}/>
                                        </div>
                                        <div>
                                            <input type="submit" value={"Continue"} className={"py-[12px] text-white w-full rounded-[50px] bg-[#4F46E5] px-[24px]"}/>
                                        </div>
                                        <div className={"w-full text-center mt-[10px]"}>
                                            <p className={"font-[400] text-[16px] leading-[24px]"}>New user? <span className={"text-[#3730A3]"}>Create an account</span></p>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}
export default Login
