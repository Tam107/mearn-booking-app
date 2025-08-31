import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import iconMap from "../../data/iconMap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {  updateBookingApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Payment = ({ data ,numberOfDays,totalPrice,clientID,id}) => {
 
    const exchangeRate = 25000; // Tỷ giá cố định
    const totalPriceInUSD = (totalPrice / exchangeRate).toFixed(2); // Chuyển đổi sang USD

    const [disableButton,setDisablueButton] = useState(false)
    
     const navigate = useNavigate()
    
  const handleSuccess =async (details)=>{
    
  setDisablueButton(true)
    let newData = data
    newData.paymentMethod = "paypal"
    newData.isPaid= true
    newData.payAt = new Date()
    newData.totalPrice= totalPrice
    newData.totalPriceUSD= totalPriceInUSD
    newData.status = "Pending"
    

    const res = await updateBookingApi(id,newData)
    if (res.success) {
        toast.success("Your payment was successful");
        setDisablueButton(false);
        navigate(`/orderSuccess/${id}`)
  
      } else {
        setDisablueButton(false);
        return toast.error(res.message);
      }
  
      setDisablueButton(false);
    
  }

  return (
    <>
      <div className="container mx-auto  p-10 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-3">
            Your Accommodation Booking
          </h1>
          <p className="text-lg text-[#687176]">
            We’re holding this price for you! Let’s complete your payment
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="left">
            <div className="mb-6 bg-white rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  How would you like to pay?
                </h2>
              </div>
              <div>
                {clientID && (
                  <>
                    <PayPalScriptProvider options={{
    clientId: clientID, // Client ID từ môi trường Sandbox
    currency: "USD", // Đơn vị tiền tệ
    intent: "capture", // Chỉ ủy quyền, không thực hiện thanh toán thật
  }}>
                      <PayPalButtons
                      createOrder={(dataOrder, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "USD",
                                value: totalPriceInUSD,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(dataOrder, actions) => {
                        return actions.order.capture().then((details) => {
                          handleSuccess(details); // Gọi hàm xử lý sau khi thanh toán thành công
                        });
                      }}
                      // createOrder={createOrder}
                      // onApprove={onApprove}
                    //   disabled={disableButton}
                      />
                    </PayPalScriptProvider>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right flex flex-col gap-4">
            <div className="bg-white shadow-md rounded-lg px-6 py-4">
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
                        className="w-full rounded-lg object-cover"
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
                      {numberOfDays} Night
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
            <div className="bg-white shadow-md rounded-lg px-6 py-4">
              {/* Cancellation and Reschedule Policy */}
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <i className="fas fa-file-alt text-blue-500"></i> Cancellation
                and Reschedule Policy
              </h3>
              <p className="text-sm text-gray-500 mb-4 px-4">
                You got it all covered! You get the most flexibility for your
                booking with this room option.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-full">
                  <h4 className="font-[500] text-lg mb-4 w-full">House rules</h4>
                  <div className="flex flex-col gap-2">
                    {data?.roomType?.hotel?.policy?.map((i) => {
                      if (i.type === "House rules") {

                        return (
                          <>
                            <div className=" flex items-center gap-3">
                              {i.icon && (
                                <>
                                  {React.createElement(iconMap[i?.icon], {
                                    size: 20,
                                  })}
                                </>
                              )}

                              <div className="py-2 text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                <h4 className=" text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                  {i?.name}
                                </h4>
                              </div>
                            </div>{" "}
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="w-full">
                  <h4 className="font-[500] mb-4 text-lg">Safety & property</h4>
                  <div className="flex flex-col gap-2">
                    {data?.roomType?.hotel?.policy?.map((i) => {
                      if (i.type === "Safety & property") {
                        return (
                          <>
                            <div className="w-full flex items-center gap-3">
                              {i.icon && (
                                <>
                                  {React.createElement(iconMap[i?.icon], {
                                    size: 20,
                                  })}
                                </>
                              )}

                              <div className="py-2 text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                  {i?.name}
                                </h4>
                              </div>
                            </div>{" "}
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="w-full">
                  <h4 className="font-[500] mb-4 text-lg">
                    Cancellation policy
                  </h4>
                  <div className="flex w-full flex-col gap-2">
                    {data?.roomType?.hotel?.policy?.map((i) => {
                      if (i.type === "Cancellation policy") {
                        return (
                          <>
                            <div className="w-full flex items-center gap-3">
                              {i.icon && (
                                <>
                                  {React.createElement(iconMap[i?.icon], {
                                    size: 20,
                                  })}
                                </>
                              )}

                              <div className="py-2 flex-1 text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                  {i?.name}
                                </h4>
                              </div>
                            </div>{" "}
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
