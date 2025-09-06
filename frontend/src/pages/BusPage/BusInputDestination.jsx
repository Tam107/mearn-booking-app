import React, { useState } from "react";
import { PiBusThin } from "react-icons/pi";
import unidecode from 'unidecode';
import { cities, searchCity } from "../../Common/common";

const BusInputDestination = ({ type,setData,data }) => {
    const [filteredCities, setFilteredCities] = useState(cities);
    const [showSuggestionsFrom, setShowSuggestionsFrom] = useState(false);
    const handleChangeFrom = (e) => {
        const value = e.target.value;
        if(e.target.value.trim().length ==0){
            setFilteredCities(cities);
            setShowSuggestionsFrom(true);
            setData(value);
            return;
        } 
        setData(value);
        if (value.length > 0) {
          const filtered = searchCity(cities,value)
          setFilteredCities(filtered);
          setShowSuggestionsFrom(true);
        } else {
          setShowSuggestionsFrom(false);
        }
    };
  return (
    <>
      <div className="flex flex-col gap-1">
        <h4 className="text-[12px] font-bold">{type}</h4>
        <div className="relative rounded-sm border-[1px]">
          <PiBusThin className="absolute top-0 border-r-[1px] p-1 size-8" />
          <input
            type="text"
            className="h-8 w-full font-sm font-[400] text-[14px] rounded-sm pl-9"
            placeholder={`${type}: City, Place, Hotel`}
            value={data}
            onChange={handleChangeFrom}
            onBlur={() => setTimeout(() => setShowSuggestionsFrom(false), 100)}
            onFocus={() => filteredCities.length > 0 && setShowSuggestionsFrom(true)}
          />
          {showSuggestionsFrom && (
            <ul className="absolute top-full left-0 right-0 bg-white border mt-1 max-h-60 overflow-auto z-50">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <li
                    value={city.name}
                    key={city.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => setData(city?.name)
                    }
                  >
                    {city.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default BusInputDestination;
