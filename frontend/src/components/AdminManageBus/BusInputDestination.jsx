import React, { useEffect, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { cities, searchCity } from "../../Common/common.js";
import { Input } from "antd";
const BusInputDestination = ({ value, setData, type, setPoint }) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      const filtered = searchCity(cities, e.target.value);
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setInputValue("")
      setFilteredCities(cities);
    }
  };

  const handleSelect = (city) => {
    setInputValue(city.name);
    setData(city.name);
    setPoint([]);
    setShowSuggestions(false);
  };
  useEffect(()=>{setInputValue(value)},[value,showSuggestions])

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg">
        {type} <span className="text-red-500">*</span>
      </p>
      <div
        style={{ borderColor: "rgba(180, 180, 180, 1)" }}
        className="rounded-[4px] flex relative border-[1px]"
      >
        <IoIosArrowDropright
          style={{ borderColor: "rgba(180, 180, 180, 1)" }}
          className="size-8 border-r-[1px]"
        />
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          className="!border-0 !bg-[#F9FAFB] !focus:outline-none hover:!border-0 hover:!shadow-none"
          placeholder="Enter city name"
        />
        {showSuggestions && filteredCities.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border mt-1 max-h-60 overflow-auto z-50">
            {filteredCities.map((city) => (
              <li
                key={city.isoCode}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(city)}
                
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BusInputDestination;
