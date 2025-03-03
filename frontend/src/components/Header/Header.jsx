import React, { useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import { CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";



const Header = () => {
    const [active,setActive] = useState(false)

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
    const navStyle = (isActive) => 
    `flex hover:bg-[#F3F4F6] hover:rounded-full duration-200 transition font-[400] text-[16px] leading-[24px] cursor-pointer py-[8px] rounded-[999px]  px-[20px]  ${isActive ? 'font-[500] text-[#374151]  bg-[#F3F4F6]' : 'text-[#6B7280]'}`;
  return (
    <>
        <div className={`${active ? 'fixed top-0 w-full z-50 bg-gray-200' : ''} transition duration-200`}>

       
        <div className='w-11/12 mx-auto'>
            <div className={`hidden md:h-[50px] md:px-6 md:my-[20px] md:flex items-center justify-between`}>
                <NavLink to="/">
                    <p className='text-[25px] font-[600] uppercase'>highlightsofvietnam</p>
                </NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive) } to="/a">Bus Ticket</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/b">Train Ticket</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/c">Things Todo</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/d">HaLong Bay Cruises</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/hotel">Hotel </NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/packageTour">Package Tour </NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/hotDeal">Hot Deal </NavLink>
                <div className='flex items-center'>
                    <CiBellOn size={28}/>
                     <Link to={"/login"}><CgProfile size={28} color="#000000" className='ml-2'/> </Link>
                    {/*<img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-trai-dep-Viet-Nam-58.jpg' className="ml-2 object-cover w-[32px] h-[32px] rounded-full" alt=""/>*/}
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Header