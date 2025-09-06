import React, { useEffect, useState } from "react";
import { Checkbox, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllArrivalPointAdminAction,
  getAllBoardingPointAdminAction,
} from "../../redux/actions/BusAction";
import { removeDiacritics } from "../../Common/common";

const { Panel } = Collapse;

const FilterBus = ({
  from,
  to,
  boardingFilter,
  setBoardingFilter,
  arrivalFilter,
  setArrivalFilter,
  setPoNameFilter,
  poNameFilter,
  buses,
  departureTimeFilter,
  setDepartureTimeFilter,
  arrivalTimeFilter,
  setArrivalTimeFilter,
  seatArrangementFilter,
  setSeatArrangementFilter,
  seatsTypeFilter,
  setSeatsTypeFilter,
}) => {
  const dispatch = useDispatch();
  const stateBus = useSelector((state) => state.BusReducer);
  useEffect(() => {
    dispatch(getAllBoardingPointAdminAction());
    dispatch(getAllArrivalPointAdminAction());
  }, []);

  // default options
  const [boardingnPointDefault, setBoardingnPointDefault] = useState([]);
  const [arrivalPointDefault, setArrivalPointDefault] = useState([]);
  const [poNameDefault, setPoNameDefault] = useState([]);
  const departureTimeDefault = [
    "00:00 - 06:00",
    "06:00 - 12:00",
    "12:00 - 18:00",
    "18:00 - 00:00",
  ];
  const arrivalTimeDefault = [
    "00:00 - 06:00",
    "06:00 - 12:00",
    "12:00 - 18:00",
    "18:00 - 00:00",
  ];
  const seatArrangementDefault = [
    "1 - 20 seats",
    "21 - 30 seats",
    "31 - 40 seats",
    "41 - 50 seats",
  ];
  const seatsTypeDefault = ["1-1", "2-2"];

  // set default options
  useEffect(() => {
    const tmpBoarding = stateBus?.boardingPointsAdmin
      ?.filter((i) => removeDiacritics(i.city) == from)
      .map((i) => i.name);
    const tmpArrival = stateBus?.arrivalPointsAdmin
      ?.filter((i) => removeDiacritics(i.city) == to)
      .map((i) => i.name);
    setPoNameDefault(buses?.map((i) => i.poName));
    setBoardingnPointDefault(tmpBoarding);
    setArrivalPointDefault(tmpArrival);
  }, [
    stateBus?.arrivalPointsAdmin,
    stateBus?.boardingPointsAdmin,
    from,
    to,
    buses,
  ]);

  console.log(stateBus);

  return (
    <div className="w-[250px] mr-2 bg-white h-full p-4 shadow-lg rounded-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-semibold">Filter Results</h3>
          <p className="text-sm text-blue-400 cursor-pointer">Reset filter</p>
        </div>
        <p className="text-[#687176] text-sm">
          Showing results based on your categories
        </p>
      </div>

      <Collapse defaultActiveKey={["1", "2", "3"]}>
        <Panel header="Select boarding point" key="1">
          <Checkbox.Group
            options={boardingnPointDefault}
            value={boardingFilter}
            onChange={(data) => setBoardingFilter(data)}
          />
        </Panel>

        <Panel header="Select arrival point" key="2">
          <Checkbox.Group
            options={arrivalPointDefault}
            value={arrivalFilter}
            onChange={(data) => setArrivalFilter(data)}
          />
        </Panel>

        <Panel header="Departure Time" key="3">
          <Checkbox.Group
            options={departureTimeDefault}
            value={departureTimeFilter}
            onChange={(data) => setDepartureTimeFilter(data)}
          />
        </Panel>

        <Panel header="Arrival Time" key="4">
          <Checkbox.Group
            options={arrivalTimeDefault}
            value={arrivalTimeFilter}
            onChange={(data) => setArrivalTimeFilter(data)}
          />
        </Panel>

        <Panel header="PO Name" key="5">
          <Checkbox.Group
            options={poNameDefault}
            value={poNameFilter}
            onChange={(data) => setPoNameFilter(data)}
          />
        </Panel>

        <Panel header="Seat Arrangement" key="6">
          <Checkbox.Group
            options={seatArrangementDefault}
            value={seatArrangementFilter}
            onChange={(data) => setSeatArrangementFilter(data)}
          />
        </Panel>
        <Panel header="Seat(s)" key="7">
          <Checkbox.Group
            options={seatsTypeDefault}
            value={seatsTypeFilter}
            onChange={(data) => setSeatsTypeFilter(data)}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterBus;
