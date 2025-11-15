import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { cities, searchCity } from "../../Common/common.js";
import { Input } from "antd";

const BusInputDestination = ({ value, setData, type, setPoint }) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null); // Reference for the input field
  const listRef = useRef(null); // Reference for the suggestions list

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      const filtered = searchCity(cities, e.target.value);
      setFilteredCities(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);  // Reset the selected index when the input changes
    } else {
      setInputValue("");
      setFilteredCities(cities);
    }
  };

  const handleSelect = (city) => {
    setInputValue(city.name);
    setData(city.name);
    setPoint([]);
    setShowSuggestions(false);
    setSelectedIndex(-1); // Reset the selected index
    inputRef.current.blur(); // Remove focus from the input
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move down in the list
      if (selectedIndex < filteredCities.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      // Move up in the list
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      // Select the item when Enter is pressed
      handleSelect(filteredCities[selectedIndex]);
    }
  };

  // Scroll the selected item into view
  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedItem = listRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Ensures the selected item is fully visible
        });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    setInputValue(value);
  }, [value, showSuggestions]);

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
          ref={inputRef} // Add the reference to the input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onKeyDown={handleKeyDown} // Add the key down handler
          className="!border-0 !bg-[#F9FAFB] !focus:outline-none hover:!border-0 hover:!shadow-none"
          placeholder="Enter city name"
        />
        {showSuggestions && filteredCities.length > 0 && (
          <ul
            ref={listRef}
            className="absolute top-full left-0 right-0 bg-white border mt-1 max-h-60 overflow-auto z-50"
          >
            {filteredCities.map((city, index) => (
              <li
                key={city.isoCode}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  index === selectedIndex ? "bg-gray-200" : ""
                }`} // Highlight the selected item
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
