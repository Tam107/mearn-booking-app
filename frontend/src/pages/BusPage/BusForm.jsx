import React, { useState } from "react";
import { PiBusThin } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { DatePicker } from "antd";
import { Select } from "antd";
import { GoPerson } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { State } from "country-state-city";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
const BusForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seats, setSeats] = useState();
  const navigate = useNavigate();

  function compareWithToday(dateFromApi) {
    const today = dayjs();
    const apiDate = dayjs(dateFromApi);
  
    if (apiDate.isBefore(today, 'day')) return false;
    return true;
  }

  // default
  const cities = State.getStatesOfCountry("VN");
  console.log(cities);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    if (!from || !to || !departureDate || !seats) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if(!compareWithToday(departureDate)){
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

  return (
    <>
      <div className="w-11/12 mx-auto my-10">
        <div className="text-center flex flex-col gap-2 mb-5">
          <h2 className="font-[600] pb-2 text-[36px] leading-[40px] text-[#1F2937]">
            Book Bus Travel Shuttle Tickets with Promo Price
          </h2>
          <p className="font-[400]  mx-10 text-[16px] leading-[24px] text-[#6B7280]">
            Booking bus and travel shuttle tickets is now as easy as shopping
            online from Highlights of Vietnam online agent ticket. Find complete
            information of bus and travel routes, schedules, boarding points,
            facilities, and ticket prices in Highlights of Vietnam Lifestyle
            SuperApp.
          </p>
        </div>
          <div className="mx-auto w-11/12  px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-6 flex flex-col gap-8 border border-gray-100">
                  {/* Header */}
                  <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                          🚌 Bus & Shuttle Ticket
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                          Find your perfect ride quickly
                      </p>
                  </div>

                  {/* From & To */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              From
                          </label>
                          <div className="relative">
                              <PiBusThin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-20 w-5 z-10" />
                              <Select
                                  showSearch
                                  placeholder="Select city"
                                  value={from}
                                  size={"large"}
                                  onChange={(value) => setFrom(value)}
                                  options={cities.map((c) => ({ value: c.id, label: c.name }))}
                                  className="w-full h-15 p-4 pl-8 [&_.ant-select-selector]:h-12 [&_.ant-select-selector]:rounded-lg [&_.ant-select-selector]:border-gray-200 hover:[&_.ant-select-selector]:border-gray-300 [&_.ant-select-selector]:focus:border-blue-500 [&_.ant-select-selector]:focus:ring-2 [&_.ant-select-selector]:focus:ring-blue-500"
                              />
                          </div>
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              To
                          </label>
                          <div className="relative">
                              <PiBusThin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                              <Select
                                  showSearch
                                  placeholder="Select city"
                                  value={to}
                                  size={"large"}
                                  onChange={(value) => setTo(value)}
                                  options={cities.map((c) => ({ value: c.id, label: c.name }))}
                                  className="w-full h-12 pl-8 [&_.ant-select-selector]:h-12 [&_.ant-select-selector]:rounded-lg [&_.ant-select-selector]:border-gray-200 hover:[&_.ant-select-selector]:border-gray-300 [&_.ant-select-selector]:focus:border-blue-500 [&_.ant-select-selector]:focus:ring-2 [&_.ant-select-selector]:focus:ring-blue-500"
                              />
                          </div>
                      </div>
                  </div>

                  {/* Departure & Seats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              Departure Date
                          </label>
                          <div className="relative">
                              <SlCalender className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <DatePicker
                                  value={departureDate ? dayjs(departureDate) : null}
                                  onChange={(date, dateString) => setDepartureDate(dateString)}
                                  className="w-full h-12 pl-8 [&_.ant-picker-input>input]:text-sm [&_.ant-picker-input>input]:pl-2 [&_.ant-picker]:h-12 [&_.ant-picker]:rounded-lg [&_.ant-picker]:border-gray-200 hover:[&_.ant-picker]:border-gray-300 focus:[&_.ant-picker]:border-blue-500 focus:[&_.ant-picker]:ring-2 focus:[&_.ant-picker]:ring-blue-500"
                                  suffixIcon={null}
                              />
                          </div>
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              No. of Seats
                          </label>
                          <div className="relative">
                              <GoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <input
                                  type="text"
                                  placeholder="2"
                                  className="w-full h-12 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
                                  value={seats}
                                  onChange={(e) => setSeats(e.target.value)}
                              />
                          </div>
                      </div>

                      {/* Button */}
                      <div className="flex items-end">
                          <button
                              onClick={handleSubmit}
                              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:scale-[1.02] hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all duration-300"
                          >
                              <IoIosSearch className="h-5 w-5" />
                              Search
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default BusForm;
