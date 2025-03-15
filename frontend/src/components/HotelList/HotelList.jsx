import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { dataHotel } from "../../data/hotelData";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import Item from "./Item";

const HotelList = () => {
    const data = dataHotel
    useEffect(() => {
            window.scrollTo(0, 0);
        }
        , []);

    const {wishlist} = useSelector(state=>state.WishlistReducer)
       
  return (
    <>
      <div className="w-11/12 mx-auto my-10 md:px-6   ">
        <div className="w-full py-4 px-6 ">
          <div className="border mb-[20px] rounded-full py-[8px] w-fit pr-[8px] pl-[15px] border-gray-200 shadow-md ">
            <div className="flex items-center">
            <div className="flex items-center border-r border-gray-200">
                <input 
                type="text" 
                placeholder="Hotel name" 
                className="w-auto text-center py-1 px-1 !w-[120px] grow font-[500] text-[16px] leading-[20px]  transition-all duration-300 focus:w-[200px] outline-none"
                />
            </div>
            <div className="flex items-center border-r border-gray-200">
                <input 
                type="text" 
                placeholder="Check in/out" 
                className="w-auto text-center !w-[120px] py-1 px-1 grow font-[500] text-[16px] leading-[20px]  transition-all duration-300 focus:w-[200px] outline-none"
                />
            </div>
            <div className="flex items-center">
                <input 
                type="text" 
                placeholder="Passengers" 
                className="w-auto text-center !w-[120px] grow font-[500] px-1 py-1 text-[16px] leading-[20px] transition-all duration-300 focus:w-[200px] outline-none"
                />
            </div>
            <div className="flex items-center">
                <div className="w-[32px] flex items-center justify-center h-[32px] rounded-full bg-[#DE3151] shadow">
                    <IoIosSearch size={20} color="white"/>
                </div>
            </div>
            </div>
          </div>
          

            {/* <div className="w-full border border-[1px] border-gray-200"></div> */}

            {data.map((i,index)=>(
                <Item i={i} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default HotelList;
