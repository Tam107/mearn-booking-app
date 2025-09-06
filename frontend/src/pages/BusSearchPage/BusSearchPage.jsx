import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Button } from "antd";
import { IoIosReturnRight } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Item from "./Item";
import { removeDiacritics } from "../../Common/common";

const BusSearchPage = () => {
  const busSelector = useSelector((state) => state.BusReducer);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const from = query?.get("from");
  const to = query?.get("to");
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatted = date.toLocaleDateString("en-US", options);
    return formatted;
  };
  const departureDate = formatDate(query?.get("departureDate"));
  const seats = query?.get("seats");
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    const getData = () => {
      const filteredBuses = busSelector?.busesAdmin?.filter(
        (bus) =>
          removeDiacritics(bus?.cityFrom?.toLowerCase()) === from?.toLowerCase() &&
          removeDiacritics(bus?.cityTo?.toLowerCase()) === to?.toLowerCase()
      );
      setBuses(filteredBuses || []);
    };
    getData();
    window.scrollTo(0, 0);
  }, [from, to, busSelector?.busesAdmin]);

  

  return (
    <>
      <Header />
      <div className="w-full mt-2 bg-[#F2F3F3]">
        <div className="w-[70%] mx-auto py-6">
          <div className="w-full border-b-2 pb-3 mb-3 border-b-[#CDD0D1] flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-[16px] text-slate-900">{from}</p>
                <IoIosReturnRight size={30} />
                <p className="font-bold text-[16px] text-slate-900">{to}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-bold">
                  {departureDate}
                  <span className="pl-6">{seats} seats</span>
                </p>
              </div>
            </div>
            <div>
              <Button type="primary" size="large">
                <p className="text-[16px] font-[600]">Change Search</p>
              </Button>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-[250px] mr-2 bg-white h-full"></div>
            <div className="flex-1 flex flex-col">
              <div className="rounded-full mb-3 flex items-center justify-center gap-2 hover:bg-[#F2F3F3] transition duration-200 px-4 py-2 cursor-pointer bg-gray-50 self-end w-fit">
                <p className="font-bold font-sm text-blue-500">Sort</p>
                <IoCheckmarkDoneOutline className="text-blue-500" />
              </div>
              <div className="w-full flex flex-col">
                {buses?.length > 0 ? (
                  buses?.map((bus) => (
                    <>
                      <Item bus={bus} seats={seats}/>
                    </>
                  ))
                ) : (
                  <div className="w-full bg-white p-4 rounded-sm">
                    <h2 className="font-bold text-lg mb-2">No buses found</h2>
                    <p className="text-gray-600">
                      Try changing your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusSearchPage;