import React, {useEffect, useState} from 'react'
import {FaFacebookSquare} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {FaTwitter} from "react-icons/fa";
import {Link, useLocation, useNavigate} from 'react-router';
import {Form, Input} from 'antd';
import Store from '../../redux/store';
import {getUserApi, loginApi} from '../../../Axios/client/api';
import {loginUserAction} from '../../redux/actions/UserAction';
import toast from 'react-hot-toast';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const fetchApi = async (data) => {
        Store.dispatch(loginUserAction(data))
    }
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});  // Cuộn trang lên đầu khi route thay đổi
    }, [location]);
    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email){
            
        }
       
        const res = await loginApi({email, password});
        if (!res.success) {
            toast.error(res.message, {
                style: {
                    maxWidth: 500
                }
            })
        } else {
            toast.success("Login successfully!")
            fetchApi(res.data)
            navigate("/")
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/api/auth/login";
    };

    useEffect(() => {
        const checkGoogleLogin = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const error = urlParams.get("error");

            if (error) {
                toast.error("Google login failed!", {style: {maxWidth: 500}});
                navigate("/login", {replace: true});
                return;
            }

            const res = await getUserApi();
            if (res.success) {
                // toast.success("Google login successful!");
                await fetchApi(res.user);
                // Respect backend's redirect to /dashboard
                // if (window.location.pathname === "/login") {
                navigate("/");

            }
        };

        checkGoogleLogin();
    }, [navigate]);

    return (
        <>
            <div className={"bg-[#EEF2FF]  w-full h-[100px] mt-3"}>
                <div className={"absolute  top-[15%] w-full"}>
                    <div className={"w-[800px] mb-[30px]  mx-auto"}>
                        <div className={"w-full py-[10px]  rounded-[40px] shadow-lg  bg-white"}>
                            <div className={"my-[25px] w-full flex items-center justify-center flex-col gap-[10px]"}>
                                <h2 className='font-[600] text-[36px] leading-[40px] text-[#1F2937]'>Login</h2>
                                <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280]'>Welcome to our blog
                                    magazine Community</p>
                            </div>
                            <div className={"w-[50%] my-12 mx-auto"}>
                                <div className={"w-full flex flex-col items-center gap-[15px]"}>
                                    {/* <div
                                        className={"px-[24px] flex items-center rounded-[16px] py-[12px] bg-[#F3F4F6] w-full"}>
                                        <FaFacebookSquare color="#3C5999" size={24}/>

                                        <p className={"flex-1 flex items-center justify-center"}>Continue with
                                            Facebook</p>
                                    </div> */}
                                    <div
                                        className={"px-[24px] flex items-center rounded-[16px] py-[12px] bg-[#F3F4F6] w-full"}>
                                        <button
                                            type="button"
                                            onClick={handleGoogleLogin}
                                            className="px-[24px] flex items-center rounded-[16px]  bg-[#F3F4F6] w-full border-none cursor-pointer"
                                        >
                                            <FcGoogle size={24}/>
                                            <p className="flex-1 flex items-center justify-center">Continue with
                                                Google</p>
                                        </button>

                                        {/*<p className={"flex-1 flex items-center justify-center"}>Continue with*/}
                                        {/*    Google</p>*/}
                                    </div>
                                    {/* <div
                                        className={"px-[24px] flex items-center rounded-[16px] py-[12px] bg-[#F3F4F6] w-full"}>
                                        <FaTwitter color="black" size={24}/>

                                        <p className={"flex-1 flex items-center justify-center"}>Continue with
                                            Twitter</p>
                                    </div> */}

                                </div>
                                <br/>
                                <br/>
                                <div className={"w-full"}>
                                    <div className={"w-full h-[1px] bg-[#E5E7EB] relative"}>
                                        <div className={"px-[12px] bottom-[-10px] left-[45%] absolute bg-white"}><p
                                            className={"font-[500] text-[16px] leading-[24px]"}>OR</p></div>

                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className={"w-full"}>
                                    <form action="" onSubmit={handleLogin}
                                          className={"w-full flex flex-col  gap-[20px]"}>
                                        <div>
                                            <label
                                                className={"font-[500] mb-[5px]  pr-1 text-[14px] block leading-[20px]"}
                                                htmlFor="">Email <span className={"text-red-500"}>*</span></label>
                                            <input onChange={(e) => {
                                                setEmail(e.target.value)
                                            }} placeholder={"you@example.com"} type="text"
                                                   className={"py-[9px] w-full px-[13px] border-[1px] border-[#D1D5DB] rounded-[16px] shadow-md"}/>
                                        </div>
                                        <div>
                                            <label
                                                className={"font-[500] mb-[5px] pr-1 text-[14px] block leading-[20px]"}
                                                htmlFor="">Password <span className={"text-red-500"}>*</span></label>
                                            <Input.Password onChange={(e) => {
                                                setPassword(e.target.value)
                                            }} placeholder={"****"}
                                                            className={"!py-[9px] !w-full !px-[13px] !border-[1px] !border-[#D1D5DB] !rounded-[16px] !shadow-md"}/>
                                        </div>
                                        <div>
                                            <input type="submit" value={"Continue"}
                                                   className={"cursor-pointer py-[12px] text-white w-full rounded-[50px] bg-[#4F46E5] px-[24px]"}/>
                                        </div>
                                        <div className={"w-full text-center mt-[10px]"}>
                                            <p className={"font-[400] text-[16px] leading-[24px]"}>New user? <Link
                                                to={"/register"} className={"text-[#3730A3]"}>Create an account</Link>
                                            </p>
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
