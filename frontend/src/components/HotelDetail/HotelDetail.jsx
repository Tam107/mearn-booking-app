import React, { useEffect, useState } from 'react'
import { FaRegStar } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ImageHotel from './ImageHotel';
import InfoHotel from './InfoHotel';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const HotelDetail = () => {
  const [open, setOpen] = useState(true);
//  const [dataRoom,setDataRoom]=useState({});
    const {slug} = useParams()
    const [data,setData] = useState({})
    const stateHotels = useSelector(state=>state.HotelReducer)
        // const [roomType, setRoomType] = useState('');
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
      }, [])
    useEffect(() => {
        if (stateHotels.hotels && stateHotels.hotels.length > 0) {
          // Normalize the slug to match the format in the database
       
            
          const hotel = stateHotels.hotels.find(
            (hotel) => hotel.slug === slug
          );

          setData(hotel || {});  // If no hotel is found, set data as empty object
          setOpen(false);
         
        }
      }, [slug, stateHotels.hotels]);


    
    
// console.log(slug);

  return (
    <>
        <div className='w-11/12 mx-auto my-8 md:px-6'>
            <div className='w-9/11 pb-8 mx-auto'>
                <div className='w-full'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-[500] text-[30px] leading-[40px] text-black'>{data?.name}</h3>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                    <FaRegStar color='#DE3151'  size={15}/>
                                    <p className='font-[500] text-[14px] leading-[20px]'>{data?.rating}</p>
                                </div>
                                <div className='w-[2px] h-[2px] rounded-full bg-gray-500'></div>
                                <div className='flex items-center gap-1'>
                                    
                                    <p className='font-[500] text-[14px] leading-[20px] underline'>{data?.numberRating} reviews</p>
                                </div>
                                <div className='w-[2px] h-[2px] rounded-full bg-gray-500'></div>
                                <div className='flex items-center gap-1'>
                                    <FaRegBuilding color='#DE3151'  size={15}/>
                                    <p className='font-[500] text-[14px] leading-[20px] text-gray-500'>{data?.type}</p>
                                </div>
                                <div className='w-[2px] h-[2px] rounded-full bg-gray-500'></div>
                                <div className='flex items-center gap-1'>
                                    
                                <p className='font-[500] text-[14px] leading-[20px] text-gray-500'>{data?.address}, {data?.city}</p>

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
                    <ImageHotel open={open} setOpen={setOpen} data={data} photos={data?.photos}/>
                    <br />
                    <InfoHotel data={data}/>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default HotelDetail
