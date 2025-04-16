import { Editor } from "@tinymce/tinymce-react";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";
import { FaQuestionCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import {
  getAllFacilitiesApi,
  getAllServicesApi,
} from "../../../Axios/client/api";
import iconMap from "../../data/iconMap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Services from "../Services/Services";
import Facilities from "../Facilities/Facilities";
const localizer = momentLocalizer(moment);
const CustomEvent = ({ event }) => {
  return (
    <div className="text-[12px] whitespace-normal break-words leading-snug mt-auto">
      {new Intl.NumberFormat("de-DE").format(event.title)} VND
    </div>
  );
};
const AdminViewRoomDetail = () => {
  const { slug } = useParams(); // Get the slug parameter from the URL
  const [eventsDefault, setEventsDefault] = useState([]);

  const stateRooms = useSelector((state) => state.RoomReducer);
  const [data, setData] = useState({});
  const [servicesDefault, setServicesDefault] = useState([]);
  const [facilitiesDefault, setFacilitiesDefault] = useState([]);
  const [servicesId, setServicesId] = useState([]);
  const [facilitiesId, setFacilitiesId] = useState([]);

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
  }, []);
  useEffect(() => {
    const tmp = stateRooms?.rooms?.find((i) => i.slug === slug);
    console.log(tmp);

    setServicesId(tmp?.services.map((item) => item._id));
    setData(tmp);
    setFacilitiesId(tmp?.facilities.map((i) => i._id));

    //set price
    const today = moment(); // Lấy ngày hôm nay
    const oneYearFromNow = moment().add(1, "year"); // Lấy ngày 1 năm sau

    const events = [];
    let currentDay = today;
    // tmp?.priceExtra?.forEach((item) => {
    //   const startDate = moment(item.start);
    //   console.log(startDate);

    // });
    while (currentDay.isBefore(oneYearFromNow)) {
      // const ex= tmp?.priceExtra.find(i=>moment(i.start)=== currentDay.startOf("day")._)
      // console.log(currentDay.startOf("day")._d);
      // console.log(currentDay);
      const ex = tmp?.priceExtra.find((i) => {
        const startDate = moment(i.start);
        if (startDate.isSame(currentDay.startOf("day").toDate(), "day")) {
          console.log(startDate);
          return i;
        }
        return null;
      });

      // console.log(ex);
      if (ex) {
        // console.log(ex);

        events.push({
          title: ex?.title, // Gán title là "100 VND"
          start: ex?.start, // Thời gian bắt đầu là 00:00 của ngày
          end: ex?.end, // Thời gian kết thúc là 23:59 của ngày
        });
      } else {
        events.push({
          title: tmp?.price, // Gán title là "100 VND"
          start: currentDay.startOf("day").toDate(), // Thời gian bắt đầu là 00:00 của ngày
          end: currentDay.endOf("day").toDate(), // Thời gian kết thúc là 23:59 của ngày
        });
      }

      // Tiến đến ngày tiếp theo
      currentDay = currentDay.add(1, "day");
    }
    setEventsDefault(events);
  }, [stateRooms?.rooms, slug]);
  console.log(data);
  const handleUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // This enables the smooth scrolling effect
    });
  };

  return (
    <>
      <div className="w-full flex items-center justify-between py-6 px-6">
        <h2 className="font-[600] flex  leading-[40px] text-gray-600 text-[36px]">
          View Room Detail
        </h2>
        <Link
          to={`/dashboard-edit-roomDetail/${data?.slug}`}
          className="cursor-pointer bg-gray-500 text-lg text-white px-4 py-2 flex items-center justify-between rounded-3xl"
        >
          Edit Room
        </Link>
      </div>

      <div className="w-full  px-6 py-6  ">
        <div className="w-full  border border-gray-300 rounded-2xl py-4 px-4">
          <div className="w-full mb-4 border-gray-300 pb-4 border-b ">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Room Picture</h2>
              <Tooltip title="Where the customer sleeps">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div className="grid gap-2 mt-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              {data?.photos?.length > 0 &&
                data?.photos.map((item, index) => (
                  <>
                    <div key={index} className="h-32 relative flex ">
                      <img
                        src={item}
                        className="rounded-2xl w-full object-cover"
                      />
                    </div>
                  </>
                ))}
              {data?.photos?.length === 0 && <>NO IMG</>}
            </div>
          </div>

          <div className="w-full  mb-4 border-gray-300 pb-4 border-b">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Room Deatails</h2>
              <Tooltip title="Nghĩ span giúp Vĩnh">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div className="grid gap-4 grid-cols-4">
              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Hotel <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  value={data?.hotel?.name}
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                ></input>
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Room price per night <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                  type="number"
                  value={data?.price}
                  placeholder="Price"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Room Type <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                  type="text"
                  value={data?.RoomType}
                  placeholder="Room Type"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Room Capacity <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                  type="number"
                  value={data?.maxPeople}
                  placeholder="2-4 guests"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 border-gray-300 pb-4 border-b w-full">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Services</h2>
              <Tooltip title="Should choose room type first">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {servicesDefault?.length > 0 && (
                <>
                 <Services
                      isView = {true}
                      setServicesDefault={setServicesDefault}
                      servicesDefault={servicesDefault}
                      services={servicesId}
                    />
                </>
              )}
            </div>
          </div>

          <div className="mb-4 border-gray-300 pb-4 border-b w-full">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Facilities</h2>
            </div>
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {facilitiesDefault?.length > 0 && (
                <>
                    <Facilities
                    isView={true}
                    // handleFaChange={handleFaChange}
                    facilities={facilitiesId}
                    setFacilitiesDefault={setFacilitiesDefault}
                    facilitiesDefault={facilitiesDefault}
                  />
                </>
              )}
            </div>

            {/* <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {facilitiesDefault?.length > 0 && (
                <>
                  {facilitiesDefault.map((data, index) => (
                    <label className="cursor-pointer border p-4 flex rounded-2xl gap-2 items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={facilitiesId?.includes(data._id)}
                      />

                      <span className="mr-2">
                        {iconMap[data?.icon]
                          ? React.createElement(iconMap[data?.icon])
                          : null}
                      </span>

                      <span>{data.name}</span>
                    </label>
                  ))}
                </>
              )}
            </div> */}
          </div>

          <div className="mb-4  w-full">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Price extra</h2>
              <Tooltip title="Nên set theo ngày việt nam">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                display: "flex",
                gap: "30px",
              }}
            >
              <Calendar
                events={eventsDefault} // Sự kiện được truyền vào lịch
                localizer={localizer}
                startAccessor="start" // Trường 'start' trong sự kiện được sử dụng làm thời gian bắt đầu
                endAccessor="end" // Trường 'end' trong sự kiện được sử dụng làm thời gian kết thúc
                defaultView="month"
                views={["month"]}
                style={{ height: "500px", width: "100%" }} // Sử dụng width 'max-content' để lịch không bị co lại
                components={{
                  event: CustomEvent, // Ghi đè cách hiển thị sự kiện
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex mt-2 items-center justify-center cursor-pointer">
          <CiCircleChevUp onClick={handleUp} size={40} />
        </div>{" "}
      </div>
    </>
  );
};

export default AdminViewRoomDetail;
