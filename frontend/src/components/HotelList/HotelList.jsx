import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TbFilterSearch } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { LiaHotelSolid } from "react-icons/lia";
import { GiHomeGarage } from "react-icons/gi";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import Item from "./Item";

const HotelList = () => {
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [whereSearch, setWhereSearch] = useState("");
  const [city, setCity] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const cities = State.getStatesOfCountry("VN");

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(stateHotels?.hotels);
  }, [stateHotels.hotels]);

  const handleSearch = () => {
    if (nameSearch || whereSearch) {
      let filterData;

      const formattedNameSearch = nameSearch ? nameSearch.replace(/\s+/g, '-') : '';
      const formattedWhereSearch = whereSearch ? whereSearch.replace(/\s+/g, '-') : '';

      if (formattedNameSearch) {
        filterData = data.filter((i) =>
            i.slug.toLowerCase().includes(formattedNameSearch.toLowerCase())
        );
      }

      if (formattedWhereSearch) {
        filterData = data.filter((i) =>
            i.location.toLowerCase().includes(formattedWhereSearch.toLowerCase())
        );
      }

      setData(filterData);
    }
  };

  const handleCity = (e) => {
    if (e.target.value) {
      const filterData = stateHotels?.hotels.filter((i) =>
          i.city.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterData);
    }
  };

  const handleFilter = () => {
    const filterData = stateHotels?.hotels.filter((i) =>
        filterType.includes(i.type)
    );
    setData(filterData);
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setFilterType([]);
    setData(stateHotels?.hotels);
    setShowFilter(false);
  };

  return (
      <div className="w-11/12 mx-auto my-10 md:px-6">
        {/* Search and Filter Section */}
        <div className="w-full flex items-center justify-between py-4">
          {/* Search Form */}
          <div className="border rounded-full py-[8px] pr-[8px] pl-[15px] border-gray-200 shadow-md w-full md:w-[60%]">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 gap-4">
                {/* Name Search */}
                <input
                    type="text"
                    placeholder="Search for name"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    className="placeholder-[#BFBFBF] py-1 px-3 w-full rounded-full font-[500] text-[16px] outline-none"
                />
                {/* Location Search */}
                <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      handleCity(e);
                    }}
                    className="cursor-pointer py-1 px-3 w-full rounded-full text-[#BFBFBF] outline-none"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              {/* Search Button */}
              <div
                  onClick={handleSearch}
                  className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-full bg-[#4F46E5] shadow-md"
              >
                <IoIosSearch size={20} color="white" />
              </div>
            </div>
          </div>

          {/* Filter Button */}
          
        </div>

        {/* Display Hotels */}
        {data?.map((hotel, index) => (
            <Item i={hotel} key={index} />
        ))}
        {data?.length === 0 && (
            <div className="flex items-center justify-center text-center">
              No hotels available for the selected criteria. Try modifying your search.
            </div>
        )}

        {/* Filter Modal */}
        {showFilter && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50">
              <div className="w-full h-full p-12 flex justify-center">
                <div className="w-full max-w-[400px] rounded-4xl bg-white shadow-xl">
                  <div className="w-full p-6 pb-4 border-b border-b-gray-200 flex items-center justify-between">
                    <RxCross1
                        className="cursor-pointer"
                        onClick={() => setShowFilter(false)}
                        size={16}
                    />
                    <div className="font-[500] text-[18px]">Filters</div>
                    <div></div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-[400] text-[20px]">Property Type</h2>
                    <div className="flex mt-4 items-center gap-2">
                      {/* Filter Options */}
                      <div
                          onClick={() => {
                            setFilterType(filterType.includes("House") ? filterType.filter((i) => i !== "House") : [...filterType, "House"]);
                          }}
                          className={`cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4 ${filterType.includes("House") ? "border-gray-800" : ""}`}
                      >
                        <GoHome size={18} />
                        <p className="text-[16px]">House</p>
                      </div>
                      <div
                          onClick={() => {
                            setFilterType(filterType.includes("Flat") ? filterType.filter((i) => i !== "Flat") : [...filterType, "Flat"]);
                          }}
                          className={`cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4 ${filterType.includes("Flat") ? "border-gray-800" : ""}`}
                      >
                        <MdOutlineMapsHomeWork size={18} />
                        <p className="text-[16px]">Flat</p>
                      </div>
                      <div
                          onClick={() => {
                            setFilterType(filterType.includes("Villa") ? filterType.filter((i) => i !== "Villa") : [...filterType, "Villa"]);
                          }}
                          className={`cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4 ${filterType.includes("Villa") ? "border-gray-800" : ""}`}
                      >
                        <GiHomeGarage size={18} />
                        <p className="text-[16px]">Villa</p>
                      </div>
                      <div
                          onClick={() => {
                            setFilterType(filterType.includes("Hotel") ? filterType.filter((i) => i !== "Hotel") : [...filterType, "Hotel"]);
                          }}
                          className={`cursor-pointer flex items-center rounded-full border justify-center border-gray-200 gap-2 py-2 px-4 ${filterType.includes("Hotel") ? "border-gray-800" : ""}`}
                      >
                        <LiaHotelSolid size={18} />
                        <p className="text-[16px]">Hotel</p>
                      </div>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="w-full p-6 flex rounded-b-4xl items-center justify-between bg-[#FFFFFF] shadow-lg border-t border-t-gray-200">
                    <p className="font-[400] text-[18px]">Clear All</p>
                    <div onClick={handleFilter} className="py-2 px-4 rounded-md bg-black">
                      <p className="cursor-pointer font-[400] text-white text-[18px]">Find</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default HotelList;
