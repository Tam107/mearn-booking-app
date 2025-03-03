import React from 'react'
import { FaRegStar } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ImageHotel from './ImageHotel';
import InfoHotel from './InfoHotel';

const HotelDetail = () => {
  return (
    <>
        <div className='w-11/12 mx-auto my-8 md:px-6'>
            <div className='w-9/11 pb-8 mx-auto'>
                <div className='w-full'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-[500] text-[30px] leading-[40px] text-black'>Bordeaux Getaway</h3>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                    <FaRegStar color='#DE3151'  size={15}/>
                                    <p className='font-[500] text-[14px] leading-[20px]'>5.0</p>
                                </div>
                                <div className='w-[2px] h-[2px] rounded-full bg-gray-500'></div>
                                <div className='flex items-center gap-1'>
                                    
                                    <p className='font-[500] text-[14px] leading-[20px] underline'>7 reviews</p>
                                </div>
                                <div className='w-[2px] h-[2px] rounded-full bg-gray-500'></div>
                                <div className='flex items-center gap-1'>
                                    <FaRegBuilding color='#DE3151'  size={15}/>
                                    <p className='font-[500] text-[14px] leading-[20px] text-gray-500'>Superhost</p>
                                </div>
                                <div className='w-[2px] h-[2px] rounded-full bg-gray-500'></div>
                                <div className='flex items-center gap-1'>
                                    
                                <p className='font-[500] text-[14px] leading-[20px] text-gray-500'>Thanh Xuan, Ha Noi</p>

                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-1'><FaRegShareFromSquare size={15} />
                                Share
                                </div>
                                <div className='flex items-center gap-1'><FaRegHeart size={15} />
                                Save
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <ImageHotel/>
                    <br />
                    <InfoHotel/>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default HotelDetail
