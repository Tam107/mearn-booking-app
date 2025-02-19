import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";



const Header = () => {
    const navStyle = (isActive) => 
    `flex font-[400] text-[16px] leading-[24px] cursor-pointer  ${isActive ? 'font-[500] text-[#374151] rounded-[999px] py-[8px] px-[20px] bg-[#F3F4F6]' : 'text-[#6B7280]'}`;
  return (
    <>
        <div className='w-11/12 mx-auto'>
            <div className='hidden md:h-[50px] md:px-6 md:my-[20px] md:flex items-center justify-between'>
                <NavLink>
                    <p className='text-[25px] font-[600] uppercase'>highlightsofvietnam</p>
                </NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/a">Bus Ticket</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/b">Train Ticket</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/c">Things Todo</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/d">HaLong Bay Cruises</NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/e">Hotel </NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/f">Package Tour </NavLink>
                <NavLink className={({ isActive }) => navStyle(isActive)} to="/">Hot Deal </NavLink>
                <div className='flex items-center'>
                    <CiBellOn size={28}/>
                     <Link to={"/login"}><CgProfile size={28} color="#000000" className='ml-2'/> </Link>
                    {/*<img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-trai-dep-Viet-Nam-58.jpg' className="ml-2 object-cover w-[32px] h-[32px] rounded-full" alt=""/>*/}
                </div>
            </div>
        </div>
    </>
  )
}

export default Header