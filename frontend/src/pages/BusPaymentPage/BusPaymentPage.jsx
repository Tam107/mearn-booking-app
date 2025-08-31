import React, { useEffect, useState } from "react";
import Header from "../PaymentPage/Header";
import { useNavigate, useParams } from "react-router";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getPayPalClientApi } from "../../../Axios/client/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoIosReturnRight } from "react-icons/io";

const BusPaymentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const stateBus = useSelector((state) => state.BusReducer);
  const [clientID, setClientId] = useState(null);
  const [booking, setBooking] = useState(null);

  const setBookingF = () => {
    const bookings = getBusBookings();
    const book = bookings.find((b) => b._id == id);
    if (book) {
      setBooking(book);
    } else {
      if(id && stateBus?.busesAdmin?.length > 0){
        toast.error("This bus booking session has expired.");
        navigate("/bus");
      }
    }
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
  const getBusBookings = () => {
    const now = new Date().getTime();
    const existingStr = localStorage.getItem("busBooking");

    if (!existingStr) return [];

    const bookings = JSON.parse(existingStr);
    const newBooking = bookings.filter(i=>i.expiry > now)

    localStorage.setItem("busBooking", JSON.stringify(newBooking));

    return newBooking.map(i=>i.value)
  };
  const getPaypalClientId = async () => {
    const res = await getPayPalClientApi();
    setClientId(res);
  };
  useEffect(() => {
    getPaypalClientId();
    setBookingF();
    const interval = setInterval(() => {
      setBookingF(getBusBookings());
    }, 600000);
    return () => clearInterval(interval);
  }, [id, stateBus?.busesAdmin]);
  console.log(booking);

  return (
    <>
      <Header />
      <div className="bg-[#F7F9FA] h-[100vh]">
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
                      <PayPalScriptProvider
                        options={{
                          clientId: clientID, // Client ID từ môi trường Sandbox
                          currency: "USD", // Đơn vị tiền tệ
                          intent: "capture", // Chỉ ủy quyền, không thực hiện thanh toán thật
                        }}
                      >
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
                              // console.log("Payment successful:", details);
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
                <h4 className="text-sm font-semibold">Bus Details</h4>
                <div className="mt-2">
                  <h4 className="text-sm">
                    {booking?.poName} -{" "}
                    {booking?.departureTime
                      ? new Intl.DateTimeFormat("en-GB", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(booking?.departureTime))
                      : "No departure time"}
                  </h4>
                  <h4 className="text-sm">
                    {
                      booking?.totalPrice.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      )
                    }
                  </h4>
                  <div>
                    <div className="py-2">
                      <div className="flex items-center gap-4 pr-4 mr-4">
                        <div className="flex flex-col">
                          <div className="flex gap-4 items-center">
                            <div className="flex flex-col gap-1">
                              <p className="font-[600] text-sm text-slate-900">
                                {formatTime(booking?.departureTime)}
                              </p>
                              {booking?.boarding &&
                                booking?.boarding.map((board) => {
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
                                {formatTime(booking?.arrivalTime)}
                              </p>
                              {booking?.arrival &&
                                booking?.arrival.map((arrival) => {
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
                  </div>
                </div>
                <h4 className="text-sm font-semibold">Contacts</h4>
                <div className="my-1 flex flex-col gap-1">
                      <p className="text-sm ">
                        {booking?.contactDetail?.name} - {booking?.contactDetail?.email} - {booking?.contactDetail?.phoneNumber}
                      </p>
                </div>
                <h4 className="text-sm mt-2 font-semibold">Travelers</h4>
                <div className="mt-1 flex flex-col gap-1">
                  {
                    booking?.travelerDetails?.map((travel, index) => (
                      <>
                      <p className="text-sm ">
                        {travel.name} - {travel.email} - {travel.phoneNumber}
                      </p>
                      </>
                    ))
                  }
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusPaymentPage;
