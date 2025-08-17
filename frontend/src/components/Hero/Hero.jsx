import React from 'react';
import { CiSearch, CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import Img1 from "../../assets/anh1.png";
import Img2 from "../../assets/anh2.png";
import Img3 from "../../assets/anh3.png";

const Hero = () => {
  return (
      <div className='w-11/12 mx-auto'>
        <div className='w-full mx-auto relative pt-10 pb-14'>
          <div className='flex flex-col lg:flex-row gap-10 items-start justify-between'>

            {/* Left text */}
            <div className='flex flex-col gap-6 lg:w-[40%]'>
              <h2 className='font-[500] text-[48px] lg:text-[72px] leading-[56px] lg:leading-[80px] text-[#111827]'>
                Highlights of Vietnam
              </h2>
              <p className='font-[400] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px] text-[#6B7280]'>
                Accompanying us, you have a trip full of experiences. With us, booking accommodation, hotels, cruises, train, bus ticket
              </p>
              <div className='py-[13px] gap-[10px] font-[500] text-[16px] leading-[24px] w-fit text-white px-[25px] rounded-full flex items-center justify-center bg-[#4F46E5] cursor-pointer'>
                <CiSearch size={25} color='white'/>
                Start your search
              </div>
            </div>

            {/* Right images */}
            <div className='flex w-full lg:w-[60%] gap-4 flex-wrap lg:flex-nowrap'>
              <div className='flex w-full lg:w-[50%] gap-4 flex-col'>
                <img className='object-cover w-full h-[150px] lg:h-[50%] rounded-xl' src={Img3} alt="" />
                <img className='object-cover w-full h-[150px] lg:h-[50%] rounded-xl' src={Img2} alt="" />
              </div>
              <div className='w-full lg:w-[50%] relative'>
                <img className='object-cover w-full h-[150px] lg:h-[100%] rounded-xl' src={Img1} alt="" />
              </div>
            </div>
          </div>

          {/* <div className='hidden sm:absolute sm:bottom-0 sm:left-0 sm:w-full sm:flex sm:justify-center'>
            <div className='w-full lg:w-[90%] py-2 pr-3 flex flex-col sm:flex-row items-center rounded-[130px] px-2 shadow-lg bg-[#FFFFFFCC] gap-2'>

              <div className='flex-1 flex items-center gap-3 px-3 py-2 bg-white rounded-full'>
                <CiLocationOn color='#D1D5DB' size={25}/>
                <div className='flex flex-col'>
                  <h2 className='font-[600] text-[16px] lg:text-[18px]'>Location</h2>
                  <p className='text-[#9CA3AF] text-[12px] lg:text-[14px]'>Where are you going?</p>
                </div>
              </div>

              <div className='flex-1 flex items-center gap-3 px-3 py-2 bg-white rounded-full'>
                <CiCalendarDate color='#D1D5DB' size={25}/>
                <div className='flex flex-col'>
                  <h2 className='font-[600] text-[16px] lg:text-[18px]'>Check in</h2>
                  <p className='text-[#9CA3AF] text-[12px] lg:text-[14px]'>Add date</p>
                </div>
              </div>

              <div className='flex-1 flex items-center gap-3 px-3 py-2 bg-white rounded-full'>
                <CiCalendarDate color='#D1D5DB' size={25}/>
                <div className='flex flex-col'>
                  <h2 className='font-[600] text-[16px] lg:text-[18px]'>Check out</h2>
                  <p className='text-[#9CA3AF] text-[12px] lg:text-[14px]'>Add date</p>
                </div>
              </div>

              <div className='flex-1 flex items-center gap-3 px-3 py-2 bg-white rounded-full'>
                <IoPersonAddOutline color='#D1D5DB' size={25}/>
                <div className='flex flex-col'>
                  <h2 className='font-[600] text-[16px] lg:text-[18px]'>Guests</h2>
                  <p className='text-[#9CA3AF] text-[12px] lg:text-[14px]'>Add guests</p>
                </div>
              </div>

              <div className='bg-[#4F46E5] w-[48px] h-[48px] rounded-full flex items-center justify-center cursor-pointer'>
                <CiSearch color='white' size={25}/>
              </div>

            </div>
          </div> */}
        </div>
      </div>
  )
}

export default Hero;
