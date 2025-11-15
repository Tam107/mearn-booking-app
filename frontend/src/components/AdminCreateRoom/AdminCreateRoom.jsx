import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotelsAction } from "../../redux/actions/HotelAction";
import { TiPlusOutline } from "react-icons/ti";
import { DatePicker, Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  createRoomApi,
  getAllFacilitiesApi,
  getAllServicesApi,
  uploadByFilesApi,
} from "../../../Axios/client/api";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import toast from "react-hot-toast";
import { CiCircleChevUp } from "react-icons/ci";
import ModelCreateService from "../AdminCreateHotel/ModelCreateService";
import { useNavigate } from "react-router";
import { getAllRoomsAction } from "../../redux/actions/RoomAction";
import { RxCross1 } from "react-icons/rx";
import Services from "../Services/Services";
import ModelCreateFacility from "../ModelCreateFacility/ModelCreateFacility";
import Facilities from "../Facilities/Facilities";
import { useMediaQuery } from "react-responsive";
import UploadImg from "../UploadImg/UploadImg";
const localizer = momentLocalizer(moment);
function getStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

function getEndOfDay(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
}

const baseDate = new Date();


const AdminCreateRoom = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // dispatch(getAllHotelsAction());
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [hotelId, setHotelId] = useState();
  const [hotelData, setHotelData] = useState();
  const [price, setPrice] = useState();
  const [roomType, setRoomType] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [servicesDefault, setServicesDefault] = useState([]);
  const [facilitiesDefault, setFacilitiesDefault] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [modelChangePrice, setModelChangePrice] = useState(false);

  // handle facilities
  const [showCreateFacility, setShowCreateFacility] = useState(false);

  const handleEditorChange = (content) => {
    setDescription(content);
  };
  useEffect(() => {
    const alo = async () => {
      const ad = await getAllServicesApi();
      setServicesDefault(ad.data);
    };
    const ola = async () => {
      const ad = await getAllFacilitiesApi();

      setFacilitiesDefault(ad.data ? ad.data : []);
    };
    alo();
    ola();
  }, [showModel, showCreateFacility]);


  const handleUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // This enables the smooth scrolling effect
    });
  };
  const events = [
    {
      title: 9000000,
      start: getStartOfDay(baseDate),
      end: getEndOfDay(baseDate),
    },
    {
      title: 9000000,
      start: getStartOfDay(new Date(2025, 3, 7)),
      end: getEndOfDay(new Date(2025, 3, 7)),
    },
  ];

  const [eventsDefault, setEventsDefault] = useState([]);

  // Hàm tạo sự kiện với price cho các ngày không có sự kiện
  const generateEventsWithPrice = (eventsas, price) => {
    const today = moment(); // Lấy ngày hôm nay
    const oneYearFromNow = moment().add(1, "year"); // Lấy ngày 1 năm sau

    const events = [];

    // Duyệt qua từng ngày từ hôm nay đến 1 năm sau
    let currentDay = today;
    while (currentDay.isBefore(oneYearFromNow)) {
      events.push({
        title: price, // Gán title là "100 VND"
        start: currentDay.startOf("day").toDate(), // Thời gian bắt đầu là 00:00 của ngày
        end: currentDay.endOf("day").toDate(), // Thời gian kết thúc là 23:59 của ngày
      });

      // Tiến đến ngày tiếp theo
      currentDay = currentDay.add(1, "day");
    }

    return events;
  };

  useEffect(() => {
    if (hotelId) {
      const hotel = stateHotels?.hotels?.find((hotel) => hotel._id === hotelId);
      setPrice(hotel?.cheapestPrice);
      setHotelData(hotel);

      setServices(hotel?.services.map((i) => i._id));
      setEventsDefault(generateEventsWithPrice(events, hotel?.cheapestPrice));
    }
  }, [stateHotels.hotels, hotelId]);

  useEffect(() => {
    if (price) {
      const updatedEvents = generateEventsWithPrice(events, price);
      setEventsDefault(updatedEvents);
    }
  }, [price]);

  const handleServiceChange = (serviceId) => {
    setServices((services) => {
      // If the service is already selected, remove it; otherwise, add it
      if (services.includes(serviceId)) {
        return services.filter((id) => id !== serviceId); // Remove the id
      } else {
        return [...services, serviceId]; // Add the id
      }
    });
  };

  const handleFaChange = (id) => {
    const isExist = facilities.find((i) => i === id);
    if (isExist) {
      const tmp = facilities.filter((i) => i != id);
      setFacilities(tmp);
    } else {
      return setFacilities([...facilities, id]);
    }
  };

  //set gia 2
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openEndDate, setOpenEndDate] = useState(false);
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setOpenEndDate(false); // Open the endDate picker when startDate is selected
  };
  const [daysChoosed, setDaysChoosed] = useState([]);
  const handleDayClick = (date) => {
    const day = moment(date, "ddd").format("dddd");

    if (daysChoosed.includes(day)) {
      setDaysChoosed(daysChoosed.filter((d) => d !== day));
    } else {
      setDaysChoosed([...daysChoosed, day]);
    }
  };
  const [priceEvents, setPriceEvents] = useState();
  const [priceExtra, setPriceExtra] = useState([]);
  const handleChangePrice = () => {
    if (!hotelId) {
      return toast.error("Please choose hotel");
    }

    if (!startDate) {
      return toast.error("Please choose start date");
    }
    if (!endDate) {
      return toast.error("Please choose end date");
    }
    if (!priceEvents) {
      return toast.error("Price cannot be empty");
    }
    if (priceEvents <= 0) return toast.error("Invalid price");
    if (daysChoosed.length === 0) {
      return toast.error("Please choose days");
    }
    if (startDate.$d.getTime() > endDate.$d.getTime()) {
      return toast.error("Start date must be before end date");
    }

    // const dayOfWeek = moment(startDate).format("dddd");
    const newStartDate = startDate.startOf("day").toDate();
    const newEndDate = endDate.endOf("day").toDate();
    const newEvent = eventsDefault.map((event) => {
      if (
        event.start.getTime() >= newStartDate.getTime() &&
        event.end.getTime() <= newEndDate.getTime()
      ) {
        if (daysChoosed.includes(moment(event.start).format("dddd"))) {
          return {
            ...event,
            title: priceEvents,
          };
        } else {
          return event;
        }
      } else {
        return event;
      }
    });
    const priceExtraTmp = [];

    eventsDefault.forEach((event) => {
      if (
        event.start.getTime() >= newStartDate.getTime() &&
        event.end.getTime() <= newEndDate.getTime()
      ) {
        if (daysChoosed.includes(moment(event.start).format("dddd"))) {
          priceExtraTmp.push({
            ...event,
            title: priceEvents,
          });
        }
      }
    });
    if (priceExtra.length > 0) {
      const filter = priceExtra.filter(
        (item) => item.start.getTime() !== newStartDate.getTime()
      );
      setPriceExtra([...filter, ...priceExtraTmp]);
    } else {
      setPriceExtra([...priceExtraTmp]);
    }
    setEventsDefault(newEvent);

    toast.success("save changes successfully!");

    setPriceEvents("");
    setStartDate(null);
    setEndDate(null);
    setDaysChoosed([]);
  };

  const handleCreateRoom = async () => {
    if (!hotelId) {
      return toast.error("Please select a home to create a room.");
    }
    if (!roomType || roomType.trim().length === 0) {
      return toast.error("Please enter a room type");
    }
    if (!price) {
      return toast.error("Price can not be empty");
    }
    if (price <= 0) return toast.error("Invalid Price");
    if (!maxPeople) {
      return toast.error("Invalid number of room capacity");
    }
    if (maxPeople <= 0) return toast.error("Invalid number of room capacity");

    if (services.length === 0) {
      return toast.error("Please choose at least 1 services");
    }
    if (facilities.length === 0) {
      return toast.error("Please choose at least 1 facilities");
    }


    const res = await createRoomApi({
      RoomType: roomType,
      description,
      photos: photos,
      maxPeople: maxPeople,
      services,
      hotel: hotelId,
      price,
      priceExtra: priceExtra,
      facilities,
    });
    if (res.success) {
      toast.success("Create room successfully");

      dispatch(getAllRoomsAction());
      dispatch(getAllHotelsAction());
      navigate("/dashboard-view-room");
    }
  };

  const [infoChangePrice, setInfoChangePrice] = useState();
  const [priceChange, setPriceChange] = useState();
  const handleSelectSlot = (slotInfo) => {
    if (!hotelId) {
      return toast.error("Please choose hotel");
    }
    const newDate = moment().startOf("day"); // Get today's date with time set to 00:00:00

    // Compare only the dates (ignoring time)

    if (moment(slotInfo?.start).startOf("day").isBefore(newDate)) {
      setInfoChangePrice(null);
      setModelChangePrice(false);
      setPriceChange();
      return toast.error("Do not choose day in the past");
    }

    setInfoChangePrice(slotInfo);
    setModelChangePrice(true);
  };
  const handlePriceChangeOne = () => {
    if (!priceChange) {
      return toast.error("Price cannot be empty");
    }
    if (priceChange <= 0) return toast.error("Invalid price");
    const newDate = moment().startOf("day"); // Get today's date with time set to 00:00:00

    if (moment(infoChangePrice?.start).startOf("day").isBefore(newDate)) {
      setInfoChangePrice(null);
      setModelChangePrice(false);
      setPriceChange();
      return toast.error("Please choose date in the future");
    }

    const newEvent = eventsDefault.map((event, index) => {
      if (infoChangePrice?.start.getTime() == event.start.getTime()) {

        return {
          ...event,
          title: priceChange,
        };
      }
      return event;
    });
    const existExtra = priceExtra.find(
      (item) => item.start === infoChangePrice?.start
    );
    if (existExtra) {
      const newPriceExtra = priceExtra.map((item) => {
        if (item.start === infoChangePrice?.start) {
          return {
            ...item,
            title: priceChange,
          };
        }
        return item;
      });
      setPriceExtra(newPriceExtra);
    } else {
      const newPriceExtra = [
        ...priceExtra,
        {
          ...infoChangePrice,
          title: priceChange,
        },
      ];
      setPriceExtra(newPriceExtra);
    }
    toast.success("save changes successfully!");

    setEventsDefault(newEvent);
    setInfoChangePrice(null);
    setModelChangePrice(false);
    setPriceChange();
  };

  const handlePriceChangeMulti = () => {
    if (!priceChange) {
      return toast.error("Please enter price");
    }
    if (priceChange <= 0) return toast.error("Invalid price");
    const newEvent = eventsDefault.map((event) => {
      if (
        event.start.getTime() >= infoChangePrice?.start.getTime() &&
        event.end.getTime() <= infoChangePrice?.end.getTime()
      ) {
        return {
          ...event,
          title: priceChange,
        };
      }
      return event;
    });
    const timeShots = infoChangePrice.slots.map((item) => {
      return item.getTime();
    });
    const existExtra = priceExtra.map((item) => {


      if (timeShots?.includes(item.start.getTime())) {
        return {
          ...item,
          title: priceChange,
        };
      } else {
        return item;
      }
    });
    const noTimeShots = timeShots.filter((item) => {
      if (!existExtra.find((i) => i.start.getTime() === item)) {
        return item;
      }
    });

    const newPriceExtra = noTimeShots.map((item) => {
      return {
        title: priceChange,
        start: moment(item).startOf("day").toDate(),
        end: moment(item).endOf("day").toDate(),
      };
    });
    setPriceExtra([...existExtra, ...newPriceExtra]);

    setEventsDefault(newEvent);

    setPriceChange();
    setInfoChangePrice(null);
    setModelChangePrice(false);
    toast.success("save changes successfully!");
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {/* Header */}
      <div className="w-full pt-6 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2
          onClick={handleCreateRoom}
          className="font-[600] text-gray-600 text-[28px] md:text-[36px] leading-[36px] md:leading-[40px] cursor-pointer"
        >
          Create new room
        </h2>
        <div
          onClick={handleCreateRoom}
          className="cursor-pointer transition duration-200 bg-[#98A1AE] rounded-3xl hover:bg-[#c4c7cd] px-4 py-2 flex items-center gap-2 md:gap-4"
        >
          <TiPlusOutline color="white" size={20} />
          <p className="text-white text-md">Add a new room</p>
        </div>
      </div>

      {/* Room Pictures */}
      <div className="w-full px-6 py-6">
        <div className="w-full border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Room Picture</h2>
            {!isMobile && (
              <Tooltip title="Where the customer sleeps">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <UploadImg setPhotos={setPhotos} photos={photos}/>
        </div>

        {/* Room Details */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Room Details</h2>
            {!isMobile && (
              <Tooltip title="Room basic info">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Home <span className="text-red-500">*</span>
              </p>
              <select
                value={hotelId}
                onChange={(e) => setHotelId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
              >
                <option value="">Select home</option>
                {stateHotels?.hotels?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Room price per night <span className="text-red-500">*</span>
              </p>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Room Type <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="Room Type"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Room Capacity <span className="text-red-500">*</span>
              </p>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)}
                placeholder="2-4 guests"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Services</h2>
            {!isMobile && (
              <Tooltip title="Choose room type first">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="grid gap-2 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <div
              onClick={() => setShowModel(true)}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create service
            </div>
            {servicesDefault?.length > 0 && (
              <Services
                handleServiceChange={handleServiceChange}
                setServicesDefault={setServicesDefault}
                servicesDefault={servicesDefault}
                services={services}
              />
            )}
          </div>
        </div>

        {/* Facilities */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Facilities</h2>
            {!isMobile && (
              <Tooltip title="Optional facilities">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <div
              onClick={() => setShowCreateFacility(true)}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create facility
            </div>
            {facilitiesDefault?.length > 0 && (
              <Facilities
                handleFaChange={handleFaChange}
                facilities={facilities}
                setFacilitiesDefault={setFacilitiesDefault}
                facilitiesDefault={facilitiesDefault}
              />
            )}
          </div>
        </div>

        {/* Price Extra */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6 overflow-x-auto">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Price Extra</h2>
            {!isMobile && (
              <Tooltip title="Optional price changes per day">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Calendar
              selectable
              localizer={localizer}
              events={eventsDefault}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month"]}
              style={{ height: "400px", minWidth: "300px", flex: "1" }}
              onSelectSlot={handleSelectSlot}
            />
            <div className="flex-1 border p-4 rounded-2xl">
              <div className="flex flex-col gap-2 pb-6 border-b border-gray-300">
                <p className="text-md">Checked days</p>
                <div className="flex flex-wrap items-center gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, idx) => (
                      <label
                        key={idx}
                        className="flex cursor-pointer items-center gap-1"
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleDayClick(day)}
                          checked={daysChoosed.includes(day)}
                        />
                        <span className="ml-1">{day}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 pb-6 border-b border-gray-300 mt-4">
                <p className="text-md">Minimum price per night</p>
                <div className="flex">
                  <input
                    type="number"
                    className="px-4 py-2 border text-gray-500 border-gray-400 border-r-0 rounded-l-2xl w-full"
                    placeholder="Price"
                    value={priceEvents}
                    onChange={(e) => setPriceEvents(e.target.value)}
                    min={0}
                  />
                  <div className="px-4 py-2 border bg-gray-100 text-gray-500 rounded-r-2xl">
                    VND
                  </div>
                </div>
              </div>
              <div
                onClick={handleChangePrice}
                className="px-4 py-2 bg-blue-500 text-md text-white flex items-center justify-center cursor-pointer transition duration-200 hover:bg-blue-400 mt-4 rounded-2xl"
              >
                Save
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="w-full flex mt-2 items-center justify-center cursor-pointer">
          <CiCircleChevUp onClick={handleUp} size={40} />
        </div>
      </div>

      {/* Modals */}
      {showModel && (
        <ModelCreateService
          services={services}
          setServices={setServices}
          setShowModel={setShowModel}
        />
      )}
      {showCreateFacility && (
        <ModelCreateFacility
          facilities={facilities}
          setFacilities={setFacilities}
          setShowCreateFacility={setShowCreateFacility}
        />
      )}
      {modelChangePrice && infoChangePrice && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50 flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-white w-full md:w-2/5 p-4 rounded-xl relative">
            <div className="flex w-full justify-end">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setModelChangePrice(false)}
              />
            </div>
            {/* Single slot */}
            {infoChangePrice?.slots.length === 1 ? (
              <>
                <div className="flex mt-4 gap-2 items-center">
                  <p className="text-lg">Checked day:</p>
                  <p className="text-lg">
                    {moment(infoChangePrice?.start).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex mt-4">
                  <input
                    type="number"
                    className="px-4 py-2 border text-gray-500 border-gray-400 border-r-0 rounded-l-2xl w-full"
                    placeholder="Price"
                    value={priceChange}
                    onChange={(e) => setPriceChange(e.target.value)}
                  />
                  <div className="px-4 py-2 border bg-gray-100 text-gray-500 rounded-r-2xl">
                    VND
                  </div>
                </div>
                <div
                  onClick={handlePriceChangeOne}
                  className="mt-6 cursor-pointer px-4 py-2 flex items-center justify-center bg-blue-500 text-white rounded-2xl"
                >
                  Save
                </div>
              </>
            ) : (
              <>
                <div className="flex mt-4 gap-2 items-center">
                  <p className="text-lg">Checked days:</p>
                  <p className="text-lg">
                    {moment(infoChangePrice?.slots[0]).format("DD/MM/YYYY")} -{" "}
                    {moment(infoChangePrice?.end)
                      .subtract(1, "day")
                      .format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex mt-4">
                  <input
                    type="number"
                    className="px-4 py-2 border text-gray-500 border-gray-400 border-r-0 rounded-l-2xl w-full"
                    placeholder="Price"
                    value={priceChange}
                    onChange={(e) => setPriceChange(e.target.value)}
                  />
                  <div className="px-4 py-2 border bg-gray-100 text-gray-500 rounded-r-2xl">
                    VND
                  </div>
                </div>
                <div
                  onClick={handlePriceChangeMulti}
                  className="mt-6 cursor-pointer px-4 py-2 flex items-center justify-center bg-blue-500 text-white rounded-2xl"
                >
                  Save
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCreateRoom;
