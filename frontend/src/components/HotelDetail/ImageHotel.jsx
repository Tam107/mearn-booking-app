import React from 'react'
import { MdApps } from "react-icons/md";

const ImageHotel = ({photos}) => {
  console.log(photos);
  
  return (
    <>
        <div className='w-full h-[400px] grid grid-cols-2 gap-[8px]' >
            <div className=' h-full'>
              {photos?.[0] && <img className='rounded-tl-[16px] rounded-bl-[16px] object-cover h-full w-full' src={photos[0]} alt="" />}
            </div>
            <div className=' h-full grid grid-rows-2 gap-[8px]'>
              <div className='w-full  grid grid-cols-2 gap-[8px]'>
                  {photos?.[1] && <img className='object-cover h-full' src={photos[1]} alt="" />}
                  {photos?.[2] && <img className='object-cover h-full rounded-tr-[16px]' src={photos[2]} alt="" />}
              </div>
              <div className='w-full  grid grid-cols-2 gap-[8px]'>
                  {photos?.[3] && <img className='object-cover h-full' src={photos[3]} alt="" />}
                  <div className='relative h-full'>
                    {photos?.[4] && <img className='object-cover h-full rounded-br-[16px]' src={photos[4]} alt="" />}
                    <div className=' py-2 px-4 bg-white shadow-md border right-4 bottom-3 absolute rounded-xl flex items-center justify-center gap-2'><MdApps size={15}/>
                    <p className='font-[500] text-[14px] leading-[20px]'>Show all photos</p></div>
                  </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default ImageHotel
