import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { dataHotel } from "../../data/hotelData";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import Item from "./Item";
import { DatePicker } from "antd";
import { TbFilterSearch } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { LiaHotelSolid } from "react-icons/lia";
import { GiHomeGarage } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import { PiDogLight } from "react-icons/pi";

const HotelList = () => {
    const data = dataHotel
    useEffect(() => {
            window.scrollTo(0, 0);
        }
        , []);

    const {wishlist} = useSelector(state=>state.WishlistReducer)

    const [showFilter,setShowFilter] = useState(true);

       
  return (
    <>
      <div className="w-11/12 mx-auto my-10 md:px-6   ">
        <div className="w-full flex items-center justify-between py-4  ">
          <div className="border rounded-full py-[8px] pr-[8px] pl-[15px] border-gray-200 shadow-md ">
            <div className="flex items-center pl-4">
            <div className="flex  border-r flex-col border-gray-200">
                <label htmlFor="" className="px-1 ">Hotel name</label>
                <input 
                type="text" 
                placeholder="Search for name" 
                className="placeholder-[#BFBFBF] placeholder:font-[400]  placeholder:text-[14px] py-1 px-1  grow font-[500] text-[16px] leading-[20px]  transition-all duration-300 focus:w-[200px] outline-none"
                />
            </div>
            <div className="flex pl-4 border-r flex-col border-gray-200">
                <label htmlFor="" className="px-1 ">Where</label>
                <input 
                type="text" 
                placeholder="Search destinations" 
                className="placeholder-[#BFBFBF] placeholder:font-[400] placeholder:text-[14px] text-[16px] py-1 px-1 grow font-[500]  leading-[20px]  transition-all duration-300 focus:w-[200px] outline-none"
                />
            </div>
            <div className="flex px-4 flex-col border-r border-gray-200">
              <label htmlFor="" className="px-1 ">Check in</label>
                {/* <input 
                type="date" 
                placeholder="Check in/out" 
                className="py-1 px-1 grow font-[500] text-[16px] leading-[20px]  transition-all duration-300 focus:w-[200px] outline-none"
                /> */}
                <DatePicker placeholder="Add days"                className=" !px-1 !border-none !outline-none !focus:ring-0 !shadow-none"
  />
            </div>
            <div className="flex px-4 flex-col  border-r border-gray-200">
            <label htmlFor="" className="px-1 ">Check out</label>

            <DatePicker placeholder="Add days"          className="  !px-1 !border-none !outline-none !focus:ring-0 !shadow-none"
  />
            </div>
            <div className="flex pl-4 flex-col">
            <label htmlFor="" className="px-1 ">Who</label>
                <input 
                type="text" 
                placeholder="Add guests" 
                className="placeholder-[#BFBFBF] placeholder:font-[400] placeholder:text-[14px] grow font-[500] px-1 py-1 text-[16px] leading-[20px] transition-all duration-300 focus:w-[200px] outline-none"
                />
            </div>
            <div className="flex items-center">
                <div className="w-[32px] flex items-center justify-center h-[32px] rounded-full bg-[#DE3151] shadow">
                    <IoIosSearch size={20} color="white"/>
                </div>
            </div>
            </div>
          
          </div>
          <div onClick={()=>{setShowFilter(true)}} className="border cursor-pointer hover:border-black hover:bg-gray-100 transition duration-300  border-gray-200 rounded-lg flex items-center gap-4 w-fit p-4">
              <TbFilterSearch/>
              <p className="font-[400] text-[16px]">Filter</p>
          </div>
        </div>
          

            {/* <div className="w-full border border-[1px] border-gray-200"></div> */}

            {data.map((i,index)=>(
                <Item i={i} key={index} />
            ))}
        
      </div>
      {
        showFilter && (
          <>
            <div onClick={()=>{setShowFilter(false)}} className="fixed top-0 left-0 w-full h-screen z-50 bg-[#0000004b]">
              <div className="w-full h-full p-12  ">
                <div className="h-full flex flex-col  w-[42%] rounded-4xl mx-auto bg-white">
                  <div className="w-full p-6 pb-4 border-b border-b-gray-200 flex items-center justify-between">
                    <RxCross1 className="cursor-pointer" onClick={()=>{setShowFilter(false)}} size={16}/>
                    <div className="font-[500] text-[18px]">Filters</div>
                    <div></div>
                  </div>
                  <div className="flex-1 z-50 overflow-y-auto">
                    <div className=" p-6">
                        <h2 className="font-[400] text-[20px]">Type of place</h2>
                        <div className="w-full rounded-lg flex flex-wrap items-center justify-between border border-gray-200 p-1 mt-4">
                            <div className="w-[33.3%] border-2 bg-gray-100 py-2 rounded-lg text-center">
                              <p className="text-[16px]">Any type</p>
                            </div>
                            <div className="w-[33.3%] border-r border-gray-100 py-2 hover:bg-gray-100 hover:rounded-lg text-center">
                              <p className="text-[16px]">Room</p>
                            </div>
                            <div className="w-[33.3%]  py-2 hover:bg-gray-100 hover:rounded-lg text-center">
                              <p className="text-[16px]">Entire Home</p>
                            </div>
                           
                        </div>
                        <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
                    </div>
                    <div className=" p-6 pt-0">
                      <h2 className="font-[400] text-[20px]">Star Rating</h2>
                      <div className="w-full grid grid-cols-5 p-2 rounded-lg border border-gray-200  mt-4">
                            <div className=" duration-200 transition flex gap-2 justify-center w-full items-center rounded-sm hover:bg-gray-200">1  <FaStar className="text-amber-500" size={20} /></div>
                            <div className=" duration-200 transition flex gap-2 justify-center w-full items-center hover:bg-gray-100">2  <FaStar className="text-amber-500" size={20} /></div>
                            <div className=" duration-200 transition flex gap-2 justify-center w-full items-center hover:bg-gray-200" >3  <FaStar className="text-amber-500" size={20} /></div>
                            <div className=" duration-200 transition flex gap-2 justify-center w-full items-center hover:bg-gray-200">4  <FaStar className="text-amber-500" size={20} /></div>
                            <div className=" duration-200 transition flex gap-2 justify-center w-full items-center hover:bg-gray-200">5  <FaStar className="text-amber-500" size={20} /></div>

                           
                        </div>
                        <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
                    </div>
                    <div className=" p-6 pt-0">
                        <h2 className="font-[400] text-[20px]">Property Type</h2>
                        <div className="flex mt-4 items-center gap-2">
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <GoHome size={18}/>

                            <p className="text-[16px]">House</p>
                          </div>
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <MdOutlineMapsHomeWork size={18}/>


                            <p className="text-[16px]">Flat</p>
                          </div>
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <GiHomeGarage size={18}/>

                            <p className="text-[16px]">Guest house</p>
                          </div>
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <LiaHotelSolid size={18}/>

                            <p className="text-[16px]">Hotel</p>
                          </div>
                        </div>
                        <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
                    </div>
                    <div className=" p-6 pt-0">
                        <h2 className="font-[400] text-[20px]">Booking options</h2>
                        <div className="flex mt-4 items-center gap-2">
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <AiOutlineThunderbolt size={18}/>

                            <p className="text-[16px]">Instant Book</p>
                          </div>
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <IoKeyOutline size={18}/>


                            <p className="text-[16px]">Self check-in</p>
                          </div>
                          <div className="flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4">
                          <PiDogLight size={18}/>

                            <p className="text-[16px]">Allows pets</p>
                          </div>
                          
                        </div>
                        <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
                    </div>

                  </div>
                  <div className="w-full p-6 flex rounded-b-4xl items-center justify-between bg-[#FFFFFF] shadow-lg border-t border-t-gray-200">
                    <p className="font-[400] text-[18px]">Clear All</p>
                    <div className="py-2 px-4 rounded-md bg-black ">
                      <p className="font-[400] text-white text-[18px]">Show 1000+ places</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </>

        )
      }


    </>
  );
};

export default HotelList;
