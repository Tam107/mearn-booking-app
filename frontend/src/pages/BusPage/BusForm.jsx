import React, { useEffect, useState } from "react";
import { PiBusThin } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { DatePicker } from "antd";
import { GoPerson } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { State } from "country-state-city";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import BusInputDestination from "./BusInputDestination";
import { cities, removeDiacritics, searchCity } from "../../Common/common";
const BusForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seats, setSeats] = useState();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const fromQuery = query?.get("from");
  const toQuery = query?.get("to");
  const seatsQuery = query?.get("seats");
  const departureDateQuery = query?.get("departureDate");

  useEffect(()=>{
    if(fromQuery) setFrom(fromQuery)
    if(toQuery) setTo(toQuery)
    if(departureDateQuery) setDepartureDate(dayjs(departureDateQuery))
    if(seatsQuery) setSeats(seatsQuery)
  },[fromQuery,toQuery,seatsQuery,departureDateQuery])

  function compareWithToday(dateFromApi) {
    const today = dayjs();
    const apiDate = dayjs(dateFromApi);

    if (apiDate.isBefore(today, "day")) return false;
    return true;
  }

  // default
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    if (!from || !to || !departureDate || !seats) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!compareWithToday(departureDate)) {
      toast.error("Departure date cannot be in the past.");
      return;
    }
    if (isNaN(seats) || seats <= 0) {
      toast.error("Please enter a valid number of seats.");
      return;
    }
    const query = new URLSearchParams({
      from,
      to,
      departureDate,
      seats,
    }).toString();
    navigate("/bus/search?" + query);
  };
  const [filteredCitiesFrom, setFilteredCitiesFrom] = useState([]);
  const [showSuggestionsFrom, setShowSuggestionsFrom] = useState(false);
  // const handleChangeFrom = (e) => {
  //   const value = e.target.value;
  //   setFrom(value);
  //   if (value.length > 0) {
  //     const filtered = searchCity(cities)

  //     setFilteredCitiesFrom(filtered);
  //     setShowSuggestionsFrom(true);
  //   } else {
  //     setShowSuggestionsFrom(false);
  //   }
  // };

  return (
    <>
      <div className="w-full">
          <div
            style={{
              boxShadow: "0px 4px 10px rgba(3, 18, 26, 0.15)",
              backgroundColor: "rgba(255,255,255,1.00)",
            }}
            className="pt-5 pb-10 px-3 rounded-lg flex flex-col gap-3"
          >
            <div className="">
              <h3 className="text-sm font-bold pb-1">Bus & Shuttle Ticket</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6">
              <BusInputDestination
                data={from}
                type={"From"}
                setData={setFrom}
              />
              <BusInputDestination
                data={to}
                type={"To"}
                setData={setTo}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-6">
              <div className="flex flex-col gap-1">
                <h4 className="text-[12px] font-bold">Departure Date</h4>
                <div className="relative rounded-sm border-[1px]">
                  <SlCalender className="absolute top-0 border-r-[1px] p-1 size-8 z-10" />

                  <DatePicker
                    value={departureDate ? dayjs(departureDate) : null}
                    onChange={(date, dateString) =>
                      setDepartureDate(dateString)
                    }
                    className="h-8 w-full font-sm font-[400] text-[14px] !rounded-sm !pl-9"
                    suffixIcon={null}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[12px] font-bold">No. of Seats</h4>
                <div className="relative rounded-sm border-[1px]">
                  <GoPerson className="absolute top-0 border-r-[1px] p-1 size-8" />
                  <input
                    type="text"
                    placeholder="2"
                    className="h-8 w-full font-[400] text-[14px] rounded-sm pl-9"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 justify-end">
                <div
                  onClick={handleSubmit}
                  className=" cursor-pointer border-[#FF5E20] relative bg-[#FF5E20] flex h-[34px] items-center justify-center gap-2 rounded-sm border-[1px]"
                >
                  <IoIosSearch color="white" className="size-6" />
                  <h4 className="text-white">Search</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default BusForm;
