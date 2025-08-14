import React, { useEffect } from 'react'
import Header from "../../components/Header/Header.jsx";
import Login from "../../components/Login/Login.jsx";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react';

const LoginPage = ({otp,setOtp}) => {
    const {isSignedIn, user} = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
        setOtp('')
    }
    , []);
    const check = ()=>{
        if(isSignedIn){
            navigate("/")
        }
    }
    useEffect(()=>{check()},[])
 


    return (
        <>
            <div className={"relative min-h-screen"}>
                <Header/>
                <Login/>

            </div>


        </>
    )
}
export default LoginPage
