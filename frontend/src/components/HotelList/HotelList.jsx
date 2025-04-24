import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { dataHotel } from "../../data/hotelData";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import Item from "./Item";
import { DatePicker, TimePicker } from "antd";
import { TbFilterSearch } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { LiaHotelSolid } from "react-icons/lia";
import { GiHomeGarage } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import { PiDogLight } from "react-icons/pi";
import { Country, State, City } from "country-state-city";

const HotelList = () => {
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);

  const [filterType, setFilterType] = useState([]);

  useEffect(() => {
    setData(stateHotels?.hotels);
  }, [stateHotels.hotels]);
  const [nameSearch,setNameSearch] = useState("");
  const [whereSearch,setWhereSearch] = useState("");

  const handleSearch = () => {
    if (nameSearch || whereSearch) {
      let filterData;
  
      // Replace spaces with hyphens for both nameSearch and whereSearch
      const formattedNameSearch = nameSearch ? nameSearch.replace(/\s+/g, '-') : '';
      const formattedWhereSearch = whereSearch ? whereSearch.replace(/\s+/g, '-') : '';
  
      if (formattedNameSearch) {
        filterData = data.filter((i) =>
          i.slug.toLowerCase().includes(formattedNameSearch.toLowerCase())
        );
      }
  
      if (formattedWhereSearch) {
        filterData = data.filter((i) =>
          i.location.toLowerCase().includes(formattedWhereSearch.toLowerCase()) // assuming `location` is the relevant field for whereSearch
        );
      }
  
      setData(filterData);
    }
  };
  const [city, setCity] = useState("");

  const handleCity = (e)=>{
    
    if(e.target.value){
      let filterData;
      filterData = data.filter((i) =>
      i.city.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filterData);
  }
}
  
const handleKeyDown = (e) => {
  if (e.key === "Enter" && nameSearch.length > 0) {
    handleSearch(); // Trigger search on "Enter" key press
  }
  if(nameSearch.length===0 &&filterType.length===0){
    setData(stateHotels?.hotels)
  }
};
  const { wishlist } = useSelector((state) => state.WishlistReducer);

  const [showFilter, setShowFilter] = useState(false);
  const cities = State.getStatesOfCountry("VN");
  const handleFilter = async()=>{

    const dataTmp = stateHotels?.hotels
    if(filterType.length>0){

      let filterData;
      filterData = dataTmp.filter((i) =>
      filterType.includes(i.type)
    );
    setData(filterData);
    setShowFilter(false);
  }
  else{
    setNameSearch("");
    setCity("");
    setData(stateHotels?.hotels)
    setShowFilter(false);
    
  }
  }

  return (
    <>
      <div className="w-11/12 mx-auto my-10 md:px-6   ">
        <div className="w-full flex items-center justify-between py-4  ">
          <div className="border rounded-full py-[8px] pr-[8px] pl-[15px] border-gray-200 shadow-md ">
            <div className="flex items-center pl-4">
              <div className="flex  border-r flex-col border-gray-200">
                <label htmlFor="" className="px-1 ">
                  Accomodation name
                </label>
                <input
                  type="text"
                  placeholder="Search for name"
                  value={nameSearch}
                  onChange={(e)=>setNameSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="placeholder-[#BFBFBF] placeholder:font-[400]  placeholder:text-[14px] py-1 px-1  grow font-[500] text-[16px] leading-[20px]  transition-all duration-300  outline-none"
                />
              </div>
              <div className="flex pl-4 border-r mr-4 pr-4 flex-col border-gray-200">
                <label htmlFor="" className="px-1 ">
                  Where
                </label>
                {/* <input
                  type="text"
                  placeholder="Search destinations"
                  className="placeholder-[#BFBFBF] placeholder:font-[400] placeholder:text-[14px] text-[16px] py-1 px-1 grow font-[500]  leading-[20px]  transition-all duration-300  outline-none"
                /> */}
                <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if(e.target.value===""){
                    if(nameSearch.length>0){
                      setData(stateHotels?.hotels)
                      handleSearch()
                    }else{
                    setData(stateHotels?.hotels)
                  }}
                  else{
                    
                    if(nameSearch.length>0){
                      setData(stateHotels?.hotels)
                      handleSearch()
                      handleCity(e)
                  }else{    
                    
                    handleCity(e)
                  }
                }
              }}
                className="cursor-pointer focus:text-black text-[#BFBFBF] font-[400] text-[14px]   py-1 grow leading-[20px]  transition-all duration-300  outline-none"
              >
                <option className="" value="">Select City</option>
                {cities.map((city) => (
                  <option className="text-black" key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              </div>
              
             
             
              <div onClick={handleSearch} className="flex items-center">
                <div className="w-[32px] cursor-pointer flex items-center justify-center h-[32px] rounded-full bg-[#DE3151] shadow">
                  <IoIosSearch size={20} color="white" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center ">
          <div
            onClick={() => {
              console.log(123);
              setFilterType([]);
              setData(stateHotels?.hotels);
              
              
              }
            }
            className="border cursor-pointer hover:border-black hover:bg-gray-100 transition duration-300  border-gray-200 rounded-lg flex items-center gap-4 w-fit p-4"
          >
         
            <p className="font-[400] text-[16px]">Clear Filter</p>
          </div>
          <div
            onClick={() => {
              setShowFilter(true);
            }}
            className="border relative cursor-pointer hover:border-black hover:bg-gray-100 transition duration-300  border-gray-200 rounded-lg flex items-center gap-4 w-fit p-4"
          >
            <TbFilterSearch />
            <p className="font-[400] text-[16px]">Filter</p>
            <div className="size-4 rounded-full bg-red-500 text-sm text-white absolute top-1 right-2 flex items-center justify-center">{filterType.length}</div>
          </div>
          </div>
        </div>

        {/* <div className="w-full border border-[1px] border-gray-200"></div> */}

        {data?.map((i, index) => (
          <Item i={i} key={index} />
        ))}
        {data?.length==0&& (<div className="flex items-center justify-between">No hotels availabel for the selected criteria. Try modifying your search.</div>)}
      </div>
      {showFilter && (
        <>
          <div
            
            className="fixed top-0 left-0 w-full h-screen z-50 bg-[#0000004b]"
          >
            <div className="w-full h-full p-12  ">
              <div className="h-full flex flex-col  w-[42%] rounded-4xl mx-auto bg-white">
                <div className="w-full p-6 pb-4 border-b border-b-gray-200 flex items-center justify-between">
                  <RxCross1
                    className="cursor-pointer"
                    onClick={() => {
                      setShowFilter(false);
                    }}
                    size={16}
                  />
                  <div className="font-[500] text-[18px]">Filters</div>
                  <div></div>
                </div>
                <div className="flex-1 z-50 overflow-y-auto">
                  {/* <div className=" p-6">
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
                  </div> */}

<div className=" p-6 ">
                    <h2 className="font-[400] text-[20px]">Property Type</h2>
                    <div  className="flex mt-4 items-center gap-2">
                      <div onClick={()=>{
                        if(!filterType.includes("House")){
                          setFilterType([...filterType,"House"])
                        }
                        else{
                          setFilterType(filterType.filter((i)=>i!=="House"))
                        }
                      }} className={" cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4" + `${filterType.includes("House") ? " border border-gray-800" : ""}`}>
                        <GoHome size={18} />

                        <p className="text-[16px]">House</p>
                      </div>
                      <div onClick={()=>{
                        if(!filterType.includes("Flat")){
                          setFilterType([...filterType,"Flat"])
                        }
                        else{
                          setFilterType(filterType.filter((i)=>i!=="Flat"))
                        }
                      }} className={" cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4" + `${filterType.includes("Flat") ? " border border-gray-800" : ""}`}>
                        <MdOutlineMapsHomeWork size={18} />

                        <p className="text-[16px]">Flat</p>
                      </div>
                      <div onClick={()=>{
                        if(!filterType.includes("Villa")){
                          setFilterType([...filterType,"Villa"])
                        }
                        else{
                          setFilterType(filterType.filter((i)=>i!=="Villa"))
                        }
                      }} className={" cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4" + `${filterType.includes("Villa") ? " border border-gray-800" : ""}`}>
                        <GiHomeGarage size={18} />

                        <p className="text-[16px]">Villa</p>
                      </div>
                      <div onClick={()=>{
                        if(!filterType.includes("Hotel")){
                          setFilterType([...filterType,"Hotel"])
                        }
                        else{
                          setFilterType(filterType.filter((i)=>i!=="Hotel"))
                        }
                      }} className={" cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4" + `${filterType.includes("Hotel") ? " border border-gray-800" : ""}`}>
                        <LiaHotelSolid size={18} />

                        <p className="text-[16px]">Hotel</p>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
                  </div>

                 
                  
               
                </div>
                <div className="w-full p-6 flex rounded-b-4xl items-center justify-between bg-[#FFFFFF] shadow-lg border-t border-t-gray-200">
                  <p className="font-[400] text-[18px]">Clear All</p>
                  <div onClick={handleFilter} className="py-2 px-4 rounded-md bg-black ">
                    <p className=" cursor-pointer font-[400] text-white text-[18px]">
                      Find
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HotelList;
