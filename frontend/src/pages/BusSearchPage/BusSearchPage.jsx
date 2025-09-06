import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Button } from "antd";
import { IoIosReturnRight } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Item from "./Item";
import {
  changeTime,
  isInTimeRange,
  removeDiacritics,
} from "../../Common/common";
import FilterBus from "./FilterBus";

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
  const [busTmp, setBusTmp] = useState([]);
  const getData = () => {
    const filteredBuses = busSelector?.busesAdmin?.filter(
      (bus) =>
        removeDiacritics(bus?.cityFrom?.toLowerCase()) ===
          from?.toLowerCase() &&
        removeDiacritics(bus?.cityTo?.toLowerCase()) === to?.toLowerCase()
    );
    setBuses(filteredBuses || []);
    setBusTmp(filteredBuses || []);
    return filteredBuses || [];
  };
  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [from, to, busSelector?.busesAdmin]);

  // FilterBus
  const [boardingFilter, setBoardingFilter] = useState([]);
  const [arrivalFilter, setArrivalFilter] = useState([]);
  const [poNameFilter, setPoNameFilter] = useState([]);
  const [departureTimeFilter, setDepartureTimeFilter] = useState([]);
  const [arrivalTimeFilter, setArrivalTimeFilter] = useState([]);
  const [seatArrangementFilter, setSeatArrangementFilter] = useState([]);
  const [seatsTypeFilter, setSeatsTypeFilter] = useState([]);

  // update Data filter
  const filterChange = () => {
    let tmp = getData();
    if (boardingFilter.length > 0) {
      debugger;
      tmp = tmp?.filter((i) =>
        i?.boarding?.some((b) =>
          boardingFilter.some((filter) => b.name.includes(filter))
        )
      );
    }
    if (arrivalFilter.length > 0) {
      tmp = tmp?.filter((i) =>
        i?.arrival?.some((b) =>
          arrivalFilter.some((filter) => b.name.includes(filter))
        )
      );
    }
    if (poNameFilter.length > 0) {
      tmp = tmp?.filter((i) => poNameFilter.includes(i.poName));
    }
    if (departureTimeFilter.length > 0) {
      tmp = tmp.filter((i) =>
        isInTimeRange(changeTime(i.departureTime), departureTimeFilter)
      );
    }
    if (arrivalTimeFilter.length > 0) {
      tmp = tmp.filter((i) =>
        isInTimeRange(changeTime(i.arrivalTime), arrivalTimeFilter)
      );
    }
    if (seatArrangementFilter.length > 0) {
      tmp = tmp.filter((i) => {
        const seats = i.totalSeats;
        if (
          seatArrangementFilter.includes("1 - 20 seats") &&
          seats >= 1 &&
          seats <= 20
        )
          return true;
        if (
          seatArrangementFilter.includes("21 - 30 seats") &&
          seats >= 21 &&
          seats <= 30
        )
          return true;
        if (
          seatArrangementFilter.includes("31 - 40 seats") &&
          seats >= 31 &&
          seats <= 40
        )
          return true;
        if (
          seatArrangementFilter.includes("41 - 50 seats") &&
          seats >= 41 &&
          seats <= 50
        )
          return true;

        return false;
      });
    }
    if (seatsTypeFilter.length > 0) {
      tmp = tmp.filter((bus) => {
        let matches = false;

        if (seatsTypeFilter.includes("1-1") && bus.seat.includes(1)) {
          matches = true;
        }

        if (seatsTypeFilter.includes("2-2") && bus.seat.includes(2)) {
          matches = true;
        }
        return matches;
      });
    }

    setBuses(tmp);
  };
  useEffect(() => {
    filterChange();
  }, [
    boardingFilter,
    arrivalFilter,
    poNameFilter,
    departureTimeFilter,
    arrivalTimeFilter,
    seatArrangementFilter,
    seatsTypeFilter,
  ]);

  console.log(buses);

  return (
    <>
      <Header />
      <div className="w-full mt-2 bg-[#F2F3F3] min-h-[100vh]">
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
            <FilterBus
              seatArrangementFilter={seatArrangementFilter}
              setSeatArrangementFilter={setSeatArrangementFilter}
              setArrivalTimeFilter={setArrivalTimeFilter}
              arrivalTimeFilter={arrivalTimeFilter}
              departureTimeFilter={departureTimeFilter}
              setDepartureTimeFilter={setDepartureTimeFilter}
              buses={busTmp}
              poNameFilter={poNameFilter}
              setPoNameFilter={setPoNameFilter}
              boardingFilter={boardingFilter}
              setBoardingFilter={setBoardingFilter}
              setArrivalFilter={setArrivalFilter}
              arrivalFilter={arrivalFilter}
              seatsTypeFilter={seatsTypeFilter}
              setSeatsTypeFilter={setSeatsTypeFilter}
              from={from}
              to={to}
            />
            <div className="flex-1 flex flex-col">
              <div className="rounded-full mb-3 flex items-center justify-center gap-2 hover:bg-[#F2F3F3] transition duration-200 px-4 py-2 cursor-pointer bg-gray-50 self-end w-fit">
                <p className="font-bold font-sm text-blue-500">Sort</p>
                <IoCheckmarkDoneOutline className="text-blue-500" />
              </div>
              <div className="w-full flex flex-col">
                {buses?.length > 0 ? (
                  buses?.map((bus) => (
                    <>
                      <Item bus={bus} seats={seats} />
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
