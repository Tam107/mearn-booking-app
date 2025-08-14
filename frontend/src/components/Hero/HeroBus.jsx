import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import Img1 from "../../assets/anh1.png"
import Img2 from "../../assets/anh2.png"
import Img3 from "../../assets/anh3.png"
const HeroBus= () => {
  return (
    <>
        <div className='w-11/12 mx-auto'>
            <div className='w-9/11 mx-auto'>
                <div className='w-full aspect-[4/3] relative pt-10 pb-14'>
                    <div className='flex h-full gap-10 items-start justify-between'>
                        <div className='1 flex flex-col gap-6 pt-11 w-[40%]'>
                            <h2 className='font-[500] text-[72px] leading-[80px] text-[#111827]'>Highlights of Vietnam</h2>
                            <p className='font-[400] text-[18px] leading-[28px] text-[#6B7280]'>Accompanying us, you have a trip full of experiences. With us, booking accommodation, hotels, cruises, train, bus ticket</p>
                            <div className='py-[13px] gap-[10px] font-[500] text-[16px] leading-[24px] w-fit text-white px-[25px] rounded-full flex items-center justify-center bg-[#4F46E5]'><CiSearch size={25} color='white'/>
                            Start your search</div>
                        </div>
                        <div className='w-[60%] h-full gap-4 flex justify-between'>
                            <div className='flex w-[50%] pb-10 justify-between flex-col gap-4'>
                                <img className='object-cover h-[50%] w-full ' src={Img3} alt="" />
                                <img className='object-cover h-[50%] w-full ' src={Img2} alt="" />
                            </div>
                            <div className='w-[50%] h-[100%] relative'>
                                <img className='object-cover w-full h-[80%] absolute bottom-0' src={Img1} alt="" />
                            </div>
                        </div>  
                    </div>
                    <div className='absolute bottom-16 left-0 w-full'>
                        <div className='flex w-[30%] flex-row-reverse gap-4 items-center '>
                            <div><p className='text-[#9CA3AF] font-medium text-[16px] leading-[24px]'>Rental car</p></div>
                            <div className='flex gap-1 items-center justify-between'> <div className='w-[10px] h-[10px] rounded-full bg-black'></div><p className='text-[#1F2937] font-medium text-[16px] leading-[24px]'>Bus & Shuttle</p></div>
                            <div><p className='text-[#9CA3AF] font-medium text-[16px] leading-[24px]'>Stays</p></div>

                        </div>
                        <br />
                        <div className='w-full'>
                            <div className='w-[90%] py-2 pr-3 flex items-center rounded-[130px] px-1 shadow-lg bg-[#FFFFFFCC]'>
                               <div className='flex-1 flex items-center justify-between'>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <CiLocationOn color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>From</h2>
                                                <p className='text-[#9CA3AF] font-[400] text-[14px] leading-[14px]'>Where are you?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <CiLocationOn color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>To</h2>
                                                <p className='font-[400] text-[14px] leading-[14px] text-[#9CA3AF]'>Where are you going?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <CiCalendarDate color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>Departure Date</h2>
                                                <p className='font-[400] text-[14px] leading-[14px] text-[#9CA3AF]'>Add date</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <IoPersonAddOutline color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>No. of Seats</h2>
                                                <p className='font-[400] text-[14px] leading-[14px] text-[#9CA3AF] '>Add guests</p>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                               <div className='bg-[#4F46E5] w-[48px] h-[48px] shadow-sm rounded-full flex items-center justify-center z-50'><CiSearch color='white' size={25}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default HeroBus
