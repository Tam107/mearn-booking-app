import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import Item from './Item';

const RecommendExperience = () => {
  return (
    <>
        <div className='mx-auto w-11/12 my-10'>
            <div className='w-full bg-[#F3F4F6] rounded-[50px]'>
                <div className='w-9/11 py-10 mx-auto'>
                    <div className='mt-4'>
                        <h2 className='font-[600] text-[36px] leading-[40px]'>Recommended Experience</h2>
                        <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280] my-[10px]'>Popular hotels to stay that Highlights of Vietnam recommends for you</p>
                    </div>
                    <br />
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-[20px] items-center'>
                                <div className='py-[12px] px-[24px] rounded-[52px] bg-[#134E4A] text-white'>Hanoi</div>
                                <div className='py-[12px] px-[24px] rounded-[52px] bg-[#134E4A] text-white'>Hoi An</div>
                                <div className='py-[12px] px-[24px] rounded-[52px] bg-[#134E4A] text-white'>Halong</div>
                            </div>
                            <div className='bg-white py-[12px] px-[24px] flex items-center rounded-[66px] border-[1px] border-[#E5E7EB]'>
                                Search More <IoIosArrowRoundForward className='pl-2' size={30}/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='w-full'>
                        
                        <div className='grid grid-cols-4 gap-[30px]'>
                            <Item/>
                            <Item/>
                            <Item/>
                            <Item/>
                            <Item/>
                            <Item/>
                            <Item/>
                        </div>
                    </div>
                    <br />
                    <div className='w-full flex items-center justify-center'>
                        <div className='py-[9px] px-[17px] border-[1px] border-[#E5E7EB] bg-white rounded-full'>Find more</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RecommendExperience