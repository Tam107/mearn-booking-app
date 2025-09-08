import React, { useEffect, useState } from "react";
import BookingContactDetail from "../BookingComonent/BookingContactDetail";
import BookingRequest from "../BookingComonent/BookingRequest";
import BookingTravelerDetail from "../BookingComonent/BookingTravelerDetail";
import { Button, Carousel, Image } from "antd";
import toast from "react-hot-toast";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { IoIosReturnRight } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import iconMap from "../../data/iconMap";
import { useUser } from "@clerk/clerk-react";
const BookingBus = () => {
  const [booking, setBooking] = useState([]);
  const { user } = useUser();
  const { id } = useParams();
  const stateBus = useSelector((state) => state.BusReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [request, setRequest] = useState("");
  const [processPayment, setProcessPayment] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [popupRight, setPopupRight] = useState(false);
  const [showModelConfirm, setShowModelConfirm] = useState(false);
  const [travelerDetails, setTravelerDetails] = useState(
    [...Array(1)].map(() => ({
      name: "",
      email: "",
      phoneNumber: "",
    }))
  );
  const [openPrice, setOpenPrice] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  const isFormTravelerValid = () => {
    return travelerDetails?.every(
      (detail) =>
        detail.name.trim() !== "" &&
        detail.email.trim() !== "" &&
        detail.phoneNumber.trim() !== ""
    );
  };
  const handleProcessPayment = () => {
    if (!isFormTravelerValid()) {
      toast.error("Please fill in traveler details.");
      return;
    }
    if (name === "" || email === "" || phoneNumber === "") {
      toast.error("Please fill in contact details.");
      return;
    }
    setProcessPayment(true);
  };
  const getBusBookings = () => {
    const now = new Date().getTime();
    const existingStr = localStorage.getItem("busBooking");

    if (!existingStr) return [];

    const bookings = JSON.parse(existingStr);

    const newBooking = bookings.filter((i) => i.expiry > now);

    localStorage.setItem("busBooking", JSON.stringify(newBooking));

    return newBooking.map((i) => i.value);
  };
  function formatTime(time) {
    if (!time) return "";
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
  const setBookingF = () => {
    const bookings = getBusBookings();
    const book = bookings.find((b) => b._id == id);
    if (book) {
      setBooking(book);
      setTravelerDetails(
        [...Array(parseInt(book.seats) || 1)].map(() => ({
          name: "",
          email: "",
          phoneNumber: "",
        }))
      );
    } else {
      if (id && stateBus?.busesAdmin?.length > 0) {
        toast.error("This bus booking session has expired.");
        navigate("/bus");
      }
    }
  };
  useEffect(() => {
    if (user) {
      setName(user?.fullName);
      setEmail(user?.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  useEffect(() => {
    setData(stateBus?.busesAdmin?.find((bus) => bus._id === id));
    setBookingF();
  }, [id, stateBus?.busesAdmin]);
  const handlePayment = () => {
    if (!name || !email || !phoneNumber) {
      toast.error("Please fill in contact details.");
      return;
    }
    if (!isFormTravelerValid()) {
      toast.error("Please fill in traveler details.");
      return;
    }
    setShowModelConfirm(true);
  };
  const handleConfirm = () => {
    if (!name || !email || !phoneNumber) {
      toast.error("Please fill in contact details.");
      return;
    }
    if (!isFormTravelerValid()) {
      toast.error("Please fill in traveler details.");
      return;
    }
    const bookings = getBusBookings();
    let tmpIndex = bookings.findIndex((b) => b._id == id);
    if (tmpIndex === -1) {
      toast.error("This bus booking session has expired.");
      navigate("/bus");
      return;
    } else {
      let tmp = JSON.parse(localStorage.getItem("busBooking"));
      tmp[tmpIndex].value = {
        ...tmp[tmpIndex].value,
        contactDetail: {
          name,
          email,
          phoneNumber,
        },
        travelerDetails: travelerDetails,
      };
      localStorage.setItem("busBooking", JSON.stringify(tmp));

      navigate("/bus/payment/" + id);
    }
  };
  return (
    <>
      <div className="container mx-auto  p-10 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-3">Your Booking</h1>
          <p className="text-lg text-[#687176]">
            Make sure all the details on this page are correct before proceeding
            to payment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="left">
            {/* Contact Details */}
            <BookingContactDetail
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            {/* Requests */}
            <BookingRequest request={request} setRequest={setRequest} />
            <BookingTravelerDetail
              processPayment={processPayment}
              seats={booking?.seats || 1}
              travelerDetails={travelerDetails}
              setTravelerDetails={setTravelerDetails}
            />
            {!processPayment && (
              <>
                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleProcessPayment}
                    type="primary"
                    size="large"
                  >
                    <p className="text-[16px] font-[500]">Continue</p>
                  </Button>
                </div>
              </>
            )}
            {/* Room Price */}
            {processPayment && (
              <>
                <div className="bg-white shadow-md rounded-lg  py-4 mt-6">
                  <div
                    onClick={() => setOpenPrice(!openPrice)}
                    className="flex px-6 items-center justify-between cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold">Price Details</h2>
                    <div className="flex">
                      {!openPrice ? (
                        <FaChevronDown size={25} className="text-blue-400" />
                      ) : (
                        <FaChevronUp size={25} className="text-blue-400" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openPrice ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    {openPrice && (
                      <>
                        <div className="border-t-[0.5px] mt-4 border-gray-300">
                          <div className="px-6 py-2 flex items-center justify-between">
                            <h4 className="text-lg ">Price you pay</h4>
                            <h4 className="text-lg font-semibold text-orange-500">
                              {data &&
                                (data.price * booking?.seats).toLocaleString(
                                  "en-US",
                                  {
                                    style: "currency",
                                    currency: "USD",
                                  }
                                )}
                            </h4>
                          </div>
                        </div>
                        <div className="border-t-[0.5px] mt-2 border-gray-300">
                          <div className="px-6 pt-2 flex items-center justify-between">
                            <h4 className="text-lg ">
                              {data?.poName +
                                " (" +
                                data?.cityFrom +
                                " - " +
                                data?.cityTo +
                                ") x" +
                                booking?.seats}
                            </h4>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {processPayment && (
              <>
                <div className="flex w-full justify-end mt-4">
                  <button
                    // disabled={disableButton}
                    onClick={handlePayment}
                    className={` bg-orange-500 text-white py-3 rounded-md font-semibold text-lg px-6 p hover:bg-orange-600 cursor-pointer`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="right w-3/4">
            <div className="bg-white shadow-md rounded-lg px-6 py-4 w-full">
              <div className="flex gap-2 items-center mb-4">
                <p className="font-bold text-sm text-slate-900">
                  {data?.cityFrom}
                </p>
                <IoIosReturnRight size={30} />
                <p className="font-bold text-sm text-slate-900">
                  {data?.cityTo}
                </p>
              </div>
              <div className="w-full">
                <div
                  onClick={() => setPopupRight(!popupRight)}
                  className="flex  items-center justify-between cursor-pointer"
                >
                  <h2 className="text-sm font-bold">
                    {booking?.departureTime
                      ? new Intl.DateTimeFormat("en-GB", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(booking?.departureTime))
                      : "No departure time"}
                  </h2>
                  <div className="flex ">
                    {!popupRight ? (
                      <FaChevronDown size={20} className="text-blue-400" />
                    ) : (
                      <FaChevronUp size={20} className="text-blue-400 " />
                    )}
                  </div>
                </div>
                <div
                  className={` overflow-hidden ${
                    popupRight ? "max-h-[500px] mt-4" : "max-h-0"
                  }`}
                >
                  <div className="">
                    <h3 className="text-[16px] text-black font-bold">
                      {data?.poName}
                    </h3>
                    <div className="flex">
                      {data?.policy &&
                        data?.policy.map((policy, index) => (
                          <p
                            key={index}
                            className={`text-[12px] text-gray-600 ${
                              index !== 0 ? "ml-1" : ""
                            }`}
                          >
                            {policy}
                            {index !== data.policy.length - 1 && " - "}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className="py-4">
                    <div className="flex items-center gap-4 pr-4 mr-4">
                      <div className="flex flex-col">
                        <div className="flex gap-4 items-center">
                          <div className="flex flex-col gap-1">
                            <p className="font-[600] text-sm text-slate-900">
                              {formatTime(data?.departureTime)}
                            </p>
                            {data?.boarding &&
                              data?.boarding.map((board) => {
                                return (
                                  <>
                                    <p className="text-[12px] text-[rgb(104,113,118)]">
                                      {board.name} - {board.address}
                                    </p>
                                  </>
                                );
                              })}
                          </div>
                          <IoIosReturnRight size={30} />
                          <div className="flex flex-col gap-1 ">
                            <p className="font-[600] text-sm text-slate-900">
                              {formatTime(data?.arrivalTime)}
                            </p>
                            {data?.arrival &&
                              data?.arrival.map((arrival) => {
                                return (
                                  <>
                                    <p className="text-[12px] text-[rgb(104,113,118)]">
                                      {arrival.name} - {arrival.address}
                                    </p>
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5
                      onClick={() => setShowDetail(true)}
                      className="text-sm text-blue-400 font-semibold cursor-pointer"
                    >
                      Details
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetail && (
        <>
          <div className="w-full z-50 h-full fixed top-0 left-0 bg-[#0000004b] flex flex-col justify-center">
            <div className="max-w-[800px] mx-auto  bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-black font-bold">Bus Details</h3>
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShowDetail(false)}
                />
              </div>
              <div className="mt-4">
                <div className="flex items-strech">
                  <div className="flex items-center gap-4 border-r-[1px] pr-4 mr-4 border-r-gray-300">
                    <div className="flex flex-col">
                      <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-1">
                          <p className="font-[600] text-sm text-slate-900">
                            {formatTime(data?.departureTime)}
                          </p>
                          {data?.boarding &&
                            data?.boarding.map((board) => {
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
                            {formatTime(data?.arrivalTime)}
                          </p>
                          {data?.arrival &&
                            data?.arrival.map((arrival) => {
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
                    className=" pr-4 mr-4 flex items-center justify-center"
                    dangerouslySetInnerHTML={{
                      __html: calculateTimeDifference(
                        data?.departureTime,
                        data?.arrivalTime
                      ),
                    }}
                  />
                </div>
                <div>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="w-full grid grid-cols-2">
                      <p className="text-sm pb-1">
                        <span className="font-[600]">Seats:</span>{" "}
                        {data?.totalSeats} seats
                      </p>
                      <p className="text-sm pb-1">
                        <span className="font-[600]">Seats Layout:</span>{" "}
                        {booking?.layout}
                      </p>
                    </div>
                    <div className="w-full grid grid-cols-2">
                      <div className="">
                        <p className="text-sm font-[600] mb-2">Facilities:</p>
                        <div className="grid grid-cols-2 pb-1">
                          {data?.facilities?.map((i) => (
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
                      </div>
                      <div>
                        <p className="text-sm font-[600] mb-2">
                          Refund & Reschedule Policy
                        </p>
                        {data?.policy.map((pol) => {
                          return (
                            <p className="text-[rgb(104,113,118)] text-sm">
                              {pol}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showModelConfirm && (
        <>
          <div className="w-full z-50 h-full fixed top-0 left-0 bg-[#0000004b] flex flex-col justify-center">
            <div className="max-w-[300px] mx-auto  bg-white p-4 rounded-md shadow-md">
              <h2 className="font-bold text-lg">
                Are your booking details correct?
              </h2>
              <p className="text-md mt-2">
                You will not be able to change your booking details once you
                proceed to payment
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => setShowModelConfirm(false)}
                  className="bg-gray-100 text-blue-500 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Check Again
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingBus;
