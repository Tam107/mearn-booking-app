import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getBookingApi } from "../../../Axios/client/api";
import Footer from "../../components/Footer/Footer";
import iconMap from "../../data/iconMap";
import { Carousel } from "antd";

const OrderDetailPage = () => {
  const { id } = useParams();
  const stateUser = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const authenticate = async () => {
    if (!stateUser.isAuthenticated && stateUser.loading === "false") {
      toast.error("Access Denied");
      navigate("/");
    } else {
      const res = await getBookingApi(id);
      if (res.success) {
        if (
          stateUser.loading === "false" &&
          stateUser?.user?.email !== res.data.email
        ) {
          toast.error("Access Denied");
          navigate("/");
        } else {
          setData(res.data);
        }
      } else {
        toast.error(res.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    authenticate();
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex items-center bg-gray-100 px-5 gap-4 justify-end">
     {/* <button
            // onClick={handleGoHome}
            className="mt-6 cursor-pointer bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            View all orders
          </button> */}
      </div>
      <div className="grid bg-gray-100 grid-cols-2 gap-4 p-6 ">
        {/* Phần bên trái */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Order Details
          </h1>
          <div className="space-y-4">
            {/* Booking ID */}
            <div className="flex justify-between">
              <p className="text-gray-600">Booking ID:</p>
              <p className="font-semibold text-gray-800">{data._id}</p>
            </div>
            {/* Status */}
            <div className="flex justify-between">
              <p className="text-gray-600">Status:</p>
              <p
                className={`font-semibold text-white px-3 py-1 rounded-full ${
                  data.status.toLowerCase() === "request"
                    ? "bg-red-500"
                    : data.status.toLowerCase() === "pending"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {data.status}
              </p>
            </div>
            {/* Name */}
            <div className="flex justify-between">
              <p className="text-gray-600">Name:</p>
              <p className="font-semibold text-gray-800">{data.name}</p>
            </div>
            {/* Email */}
            <div className="flex justify-between">
              <p className="text-gray-600">Email:</p>
              <p className="font-semibold text-gray-800">{data.email}</p>
            </div>
            {/* Phone Number */}
            <div className="flex justify-between">
              <p className="text-gray-600">Phone Number:</p>
              <p className="font-semibold text-gray-800">
                {data.phoneNumber}
              </p>
            </div>
            {/* Guests */}
            <div className="flex justify-between">
              <p className="text-gray-600">Guests:</p>
              <p className="font-semibold text-gray-800">{data.guests}</p>
            </div>
            {/* Check-in and Check-out */}
            <div className="flex justify-between">
              <p className="text-gray-600">Check-in:</p>
              <p className="font-semibold text-gray-800">
                {new Date(data.checkIn).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Check-out:</p>
              <p className="font-semibold text-gray-800">
                {new Date(data.checkOut).toLocaleDateString()}
              </p>
            </div>
            {/* Room Type */}
            <div className="flex justify-between">
              <p className="text-gray-600">Room Type:</p>
              <p className="font-semibold text-gray-800">
                {data.roomType?.RoomType || "N/A"}
              </p>
            </div>
            {/* Hotel */}
            <div className="flex justify-between">
              <p className="text-gray-600">Hotel:</p>
              <p className="font-semibold text-gray-800">
                {data.roomType?.hotel?.name || "N/A"}
              </p>
            </div>
            
            {/* Payment.js Method */}
            <div className="flex justify-between">
              <p className="text-gray-600">Payment Method:</p>
              <p className="font-semibold text-gray-800">
                {data.paymentMethod || "N/A"}
              </p>
            </div>
            {/* Total Price */}
            <div className="flex justify-between">
              <p className="text-gray-600">Total Price:</p>
              <p className="font-semibold text-gray-800">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.totalPrice || 0)}
              </p>
            </div>
            {/* Total Price in USD */}
            <div className="flex justify-between">
              <p className="text-gray-600">Total Price (USD):</p>
              <p className="font-semibold text-gray-800">
                $
                {new Intl.NumberFormat("en-US").format(
                  data.totalPriceUSD || 0
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="bg-white shadow-md rounded-lg p-6">
        <div className="bg-white rounded-lg">
              {/* Hotel Image and Name */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {data?.roomType?.hotel?.name}
                </h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-yellow-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <Carousel
                  arrows
                  prevArrow={<button className="text-xl">{"<"}</button>}
                  nextArrow={<button className="text-xl">{">"}</button>}
                  autoplay
                >
                  {data?.roomType?.photos?.map((src, index) => (
                    <div key={index}>
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full rounded-lg h-full object-cover"
                      />
                    </div>
                  ))}
                  {data?.roomType?.hotel?.photos?.map((src, index) => (
                    <div key={index + "hotel"}>
                      <img
                        src={src}
                        alt={`Slide ${index + 1} hotel`}
                        className="w-full rounded-lg h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              {/* Check-in and Check-out */}
              <div className="mb-4">
                <div className="flex px-6 items-center gap-2">
                  <div className="min-w-40 border border-[#D3D5D6] rounded-xl flex flex-col items-stretch">
                    <div className="gap-1 flex flex-col items-center p-2 ">
                      <div className="text-sm text-[#687176]">Check-in</div>
                      <div className="text-sm font-[700] text-[#05121C]">
                        {/* {new Date(data?.checkIn)} */}

                        {new Date(data?.checkIn).toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-[#344148]">
                        from{" "}
                        {new Date(
                          data?.roomType?.hotel?.checkIn
                        ).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto mb-auto gap-1 flex-1 items-stretch flex-col">
                    <div className="self-center text-xs leading-[11px] lowercase font-medium text-[#687176] text-center mb-1">
                      
                    </div>
                    <div className="items-center flex justify-start">
                      <div className="w-1.5 h-1.5 border-[#cdcfd1] rounded-full flex flex-col items-stretch border-[1px] "></div>
                      <div className="h-[1px] flex-1 flex flex-col items-stretch bg-[#cdcfd1]"></div>
                      <div className="w-1.5 h-1.5 border-[#cdcfd1] bg-[#cdcfd1] rounded-full flex flex-col items-stretch border-[1px] "></div>
                    </div>
                  </div>
                  <div className="min-w-40 border border-[#D3D5D6] rounded-xl flex flex-col items-stretch">
                    <div className="gap-1 flex flex-col items-center p-2 ">
                      <div className="text-sm text-[#687176]">Check-out</div>
                      <div className="text-sm font-[700] text-[#05121C]">
                        {new Date(data?.checkOut).toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-[#344148]">
                        from{" "}
                        {new Date(
                          data?.roomType?.hotel?.checkOut
                        ).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div className="mb-4">
                <h4 className="text-sm font-medium">
                  {data?.roomType?.RoomType}
                </h4>
                <p className="text-sm text-red-500 font-medium">
                  In high demand!
                </p>
                <div className="grid grid-cols-3">
                  {data?.roomType?.services?.map((service, index) => (
                    <>
                      <div className="w-full flex items-center gap-3">
                        {React.createElement(iconMap[service.icon], {
                          size: 20,
                        })}
                        <div className="py-2">
                          <h4 className="font-[500] text-[16px] leading-[24px]">
                            {service.name}
                          </h4>
                        </div>
                      </div>
                    </>
                  ))}
                  {data?.roomType?.facilities?.map((service, index) => (
                    <>
                      <div className="w-full flex items-center gap-3">
                        {service?.icon &&
                          React.createElement(iconMap[service?.icon], {
                            size: 20,
                          })}
                        <div className="py-2">
                          <h4 className="font-[500] text-[16px] leading-[24px]">
                            {service.name}
                          </h4>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailPage;