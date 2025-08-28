import React, { useState } from "react";
import { PiBusThin } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { DatePicker } from "antd";
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
          <p className="font-[400] mx-10 text-[16px] leading-[24px] text-[#6B7280]">
            Booking bus and travel shuttle tickets is now as easy as shopping
            online from Highlights of Vietnam online agent ticket. Find complete
            information of bus and travel routes, schedules, boarding points,
            facilities, and ticket prices in Highlights of Vietnam Lifestyle
            SuperApp.
          </p>
        </div>
        <div className="mx-auto w-[960px]">
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
              <div className="flex flex-col gap-1">
                <h4 className="text-[12px] font-bold">From</h4>
                <div className="relative rounded-sm border-[1px]">
                  <PiBusThin className="absolute top-0 border-r-[1px] p-1 size-8" />
                  <select
                    placeholder="Da Lat"
                    type="text"
                    className="h-8 w-full font-sm font-[400] text-[14px] rounded-sm pl-9"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option>Select city</option>
                    {cities.map((c) => (
                      <option key={`from-${c.isoCode}`} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[12px] font-bold">To</h4>
                <div className="relative rounded-sm border-[1px]">
                  <PiBusThin className="absolute top-0 border-r-[1px] p-1 size-8" />
                  <select
                    placeholder="Da Lat"
                    type="text"
                    className="h-8 w-full font-sm font-[400] text-[14px] rounded-sm pl-9"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    <option>Select city</option>
                    {cities.map((c) => (
                      <option key={`to-${c.isoCode}`} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
      </div>
    </>
  );
};

export default BusForm;
