import React, { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";

const BusInputDestination = ({ value, setData, type, setPoint, cities }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCities(cities);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (city) => {
    setInputValue(city.name);
    setData(city.id);
    setPoint([]);
    setShowSuggestions(false);
  };

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
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          className="w-full bg-transparent outline-none"
          placeholder="Enter city name"
        />
      </div>
      {showSuggestions && filteredCities.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCities.map((city) => (
            <li
              key={city.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusInputDestination;
