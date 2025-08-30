import React, { useEffect, useState } from "react";
import { IoIosReturnRight } from "react-icons/io";
import iconMap from "../../data/iconMap";
import { Carousel } from "antd";

const Item = ({ bus }) => {
  const [layout, setLayout] = useState("");
  const [featureTab, setFeatureTab] = useState(false);
  const [ticketTab, setTicketTab] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!bus?.photos || bus.photos.length === 0) return;
    const interval = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex + 1) % bus.photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bus?.seat?.length) {
      const generatedLayout = bus.seat
        .map((seatGroup) => {
          return Array.isArray(seatGroup)
            ? seatGroup.join("-")
            : `${seatGroup}-${seatGroup}`;
        })
        .join(", ");
      setLayout(generatedLayout);
    } else {
      setLayout("No seats available");
    }
  }, [bus]);
  function formatTime(time) {
    const date = new Date(time);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
    };
    return new Intl.DateTimeFormat("vi-VN", options).format(date);
  }
  function calculateTimeDifference(departureTime, arrivalTime) {
    // Chỉ lấy giờ và phút từ thời gian, bỏ qua ngày
    const departure = new Date("1970-01-01T" + formatTime(departureTime) + "Z");
    const arrival = new Date("1970-01-01T" + formatTime(arrivalTime) + "Z");

    let differenceInMs = arrival - departure;

    // Nếu thời gian đến (arrival) nhỏ hơn thời gian đi (departure), tức là đã qua nửa đêm
    if (differenceInMs < 0) {
      differenceInMs += 24 * 60 * 60 * 1000; // Cộng thêm 24 giờ (1 ngày)
    }

    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `
      <p class="font-bold text-sm">${hours}h ${minutes}m</p>
    `;
  }
  const handleFeatureTabClick = () => {
    setFeatureTab(!featureTab); // Mở tab Feature
    setTicketTab(false); // Đóng tab Ticket
  };

  const handleTicketTabClick = () => {
    if(!bus?.conditions) return;
    setFeatureTab(false); // Đóng tab Feature
    setTicketTab(!ticketTab); // Mở tab Ticket
  };
  return (
    <>
      <div
        className={`bg-white cursor-pointer  p-4 pb-0 shadow-lg ${
          featureTab || ticketTab ? "rounded-t-sm" : "mb-6 rounded-sm"
        }`}
      >
        <div className="pb-3">
          <h3 className="text-[16px] text-black font-bold">{bus?.poName}</h3>
          <div className="flex">
            {bus?.policy &&
              bus?.policy.map((policy, index) => (
                <p key={index} className={`text-[12px] text-gray-600 ${index !== 0 ? "ml-1" : ""}`}>
                  {policy}
                  {index !== bus.policy.length - 1 && " - "}
                </p>
              ))}
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="flex items-strech">
            <div className="flex items-center gap-4 border-r-[1px] pr-4 mr-4 border-r-gray-300">
              <div className="flex flex-col">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <p className="font-[600] text-sm text-slate-900">
                      {formatTime(bus?.departureTime)}
                    </p>
                    {bus?.boarding &&
                      bus?.boarding.map((board) => {
                        return (
                          <p className="text-[12px] text-[rgb(104,113,118)]">
                            {board.name}
                          </p>
                        );
                      })}
                  </div>
                  <IoIosReturnRight size={30} />
                  <div className="flex flex-col gap-1 ">
                    <p className="font-[600] text-sm text-slate-900">
                      {formatTime(bus?.arrivalTime)}
                    </p>
                    {bus?.arrival &&
                      bus?.arrival.map((arrival) => {
                        return (
                          <p className="text-[12px] text-[rgb(104,113,118)]">
                            {arrival.name}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="border-r-[1px] pr-4 mr-4 border-r-gray-300 flex items-center justify-center"
              dangerouslySetInnerHTML={{
                __html: calculateTimeDifference(
                  bus?.departureTime,
                  bus?.arrivalTime
                ),
              }}
            />
            <div className="flex gap-1 items-center justify-center ">
              <div className="w-fit px-3 py-1 gap-2 flex items-center justify-center  rounded-3xl border-gray-300 border-[1px] text-sm text-[rgb(104,113,118)]">
                {bus?.facilities?.map((i) => (
                  <>
                    {i.icon && (
                      <>
                        {React.createElement(iconMap[i?.icon], {
                          size: 15,
                        })}
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-center font-bold text-lg text-orange-600">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(bus?.price)}{" "}
              <span className="text-sm font-[500] text-[#687176]">/pax</span>
            </p>
            <button className="bg-orange-600 text-sm text-white px-8 py-1 rounded-md shadow-md transform hover:bg-orange-700 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <h4
            onClick={() => handleFeatureTabClick()}
            className={`mr-10 z-11 duration-150 transition text-blue-400 text-sm font-[600] ${
              featureTab ? "pb-3 border-b-2 border-blue-400" : "pb-4"
            }`}
          >
            Features
          </h4>
          <h4
            onClick={() => handleTicketTabClick()}
            className={`mr-10 z-11 duration-150 transition text-blue-400 text-sm font-[600] ${
              ticketTab ? "pb-3 border-b-2 border-blue-400" : "pb-4"
            }`}
          >
            Ticket
          </h4>
        </div>
      </div>
      {featureTab && (
        <>
          <div className="bg-white p-4 border-t-[1px] shadow-lg rounded-b-sm mb-4 border-gray-200 ">
            <div className="w-full flex items-center gap-2 justify-between">
              <div className="w-[57%] flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-[600]">Fleet Specification</h4>
                  <div className="border-[1px] border-gray-200 shadow-sm rounded-sm p-2 px-4">
                    <p className="text-sm pb-1">
                      <span className="font-[600]">Seats:</span>{" "}
                      {bus?.totalSeats} seats
                    </p>
                    <p className="text-sm pb-1">
                      <span className="font-[600]">Seats Layout:</span> {layout}
                    </p>
                    <p className="text-sm font-[600]">Facilities:</p>
                    <div className="grid grid-cols-2 pb-1">
                      {bus?.facilities?.map((i) => (
                        <>
                          <div className="w-full text-sm text-[rgb(104,113,118)] flex items-center gap-3">
                            {i.icon && (
                              <>
                                {React.createElement(iconMap[i?.icon], {
                                  size: 20,
                                })}
                              </>
                            )}{" "}
                            <div className="py-2 break-words overflow-hidden text-ellipsis line-clamp-3">
                              <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                {i?.name}
                              </h4>
                            </div>
                          </div>{" "}
                        </>
                      ))}
                    </div>
                    <p className="text-sm font-[600]">
                      Refund & Reschedule Policy
                    </p>
                    {bus?.policy.map((pol) => {
                      return (
                        <p className="text-[rgb(104,113,118)] text-sm">{pol}</p>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-[600]">How to use E-ticket</h4>
                  <div className="border-[1px] border-gray-200 shadow-sm rounded-sm p-2 px-4">
                    <ol className="list-decimal pl-5 text-sm text-[rgb(104,113,118)]">
                      <li>
                        To board the bus, you must show the e-ticket to the bus
                        staff and get your paper ticket from the bus operator.
                      </li>
                      <li>
                        Traveloka e-ticket will be issued once your payment is
                        confirmed.
                      </li>
                      <li>
                        You can use the e-ticket sent to you via email, SMS, or
                        in your Traveloka App.
                      </li>
                      <li>
                        On the day of departure, bring your e-ticket and
                        identification document to the boarding point (terminal
                        counter, agent office, or other).
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="w-[37%] flex mr-2">
                <div className="w-full">
                  <div className="max-h-[220px] max-w-[330px]">
                    <img
                      className="max-h-[220px] max-w-[330px] h-full  w-full"
                      src={bus?.photos[imgIndex]}
                      alt={bus?.poName}
                    />
                  </div>
                  <div className="flex gap-1 justify-center mt-1">
                    {[...Array(bus?.photos.length).keys()].map((index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === imgIndex ? "bg-black" : "bg-gray-300"
                        } cursor-pointer`}
                        onClick={() => setImgIndex(index)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {ticketTab && bus?.conditions && (
        <div className="bg-white p-4 border-t-[1px] shadow-lg rounded-b-sm mb-4 border-gray-200 ">
          <div className="w-full flex items-center gap-2 justify-between">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-[600]">Terms & Conditions</h4>
                <div className="border-[1px] border-gray-200 shadow-sm rounded-sm p-2 px-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: bus?.conditions }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
