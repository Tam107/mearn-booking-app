import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import Item from './Item';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const RecommendExperience = () => {
  const stateHotels = useSelector(state => state.HotelReducer);
  const navigate = useNavigate();

  const locations = ["Hanoi", "Hoi An", "Halong"];

  return (
      <div className='mx-auto w-11/12 my-10'>
        <div className='w-full bg-[#F3F4F6] rounded-[50px]'>
          <div className='w-11/12 md:w-9/12 py-10 mx-auto'>
            <div className='mt-4'>
              <h2 className='font-[600] text-[36px] leading-[40px] text-[#1F2937]'>
                Recommended Experience
              </h2>
              <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280] my-[10px]'>
                Popular hotels to stay that Highlights of Vietnam recommends for you
              </p>
            </div>

            {/* Location buttons */}
            <div className='flex flex-wrap gap-4 items-center mt-4'>
              {locations.map((loc, idx) => (
                  <div
                      key={idx}
                      className='py-3 px-6 rounded-[52px] bg-[#134E4A] text-white cursor-pointer'
                  >
                    {loc}
                  </div>
              ))}
            </div>

            {/* Hotel Items */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
              {stateHotels?.hotels?.length > 0 &&
                  stateHotels.hotels.slice(0, 8).map((hotel, index) => (
                      <Item key={index} data={hotel} />
                  ))
              }
            </div>

            {/* Find more button */}
            <div className='w-full flex justify-center mt-6'>
              <div
                  onClick={() => navigate("/homes")}
                  className='cursor-pointer py-2 px-6 border border-[#E5E7EB] bg-white rounded-full hover:bg-gray-100 flex items-center gap-2'
              >
                Find more <IoIosArrowRoundForward size={20}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default RecommendExperience;

