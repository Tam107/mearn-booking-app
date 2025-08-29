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
          make this form more beautifully and modern way
          <div className="mx-auto w-11/12 px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-6 sm:p-8 flex flex-col gap-6">
                  <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Bus & Shuttle Ticket</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-700">From</label>
                          <div className="relative">
                              <PiBusThin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                              <select
                                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                  value={from}
                                  onChange={(e) => setFrom(e.target.value)}
                              >
                                  <option value="">Select city</option>
                                  {cities.map((c) => (
                                      <option key={`from-${c.isoCode}`} value={c.id}>
                                          {c.name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                      </div>
                      <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-700">To</label>
                          <div className="relative">
                              <PiBusThin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                              <select
                                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                  value={to}
                                  onChange={(e) => setTo(e.target.value)}
                              >
                                  <option value="">Select city</option>
                                  {cities.map((c) => (
                                      <option key={`to-${c.isoCode}`} value={c.id}>
                                          {c.name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-700">Departure Date</label>
                          <div className="relative">
                              <SlCalender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-8 w-5" />
                              <DatePicker
                                  value={departureDate ? dayjs(departureDate) : null}
                                  onChange={(date, dateString) => setDepartureDate(dateString)}
                                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                  suffixIcon={null}
                              />
                          </div>
                      </div>
                      <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-gray-700">No. of Seats</label>
                          <div className="relative">
                              <GoPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                              <input
                                  type="text"
                                  placeholder="2"
                                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                  value={seats}
                                  onChange={(e) => setSeats(e.target.value)}
                              />
                          </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-end">
                          <button
                              onClick={handleSubmit}
                              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-md flex items-center justify-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm"
                          >
                              <IoIosSearch className="h-5 w-5" />
                              <span className="text-sm font-medium">Search</span>
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
