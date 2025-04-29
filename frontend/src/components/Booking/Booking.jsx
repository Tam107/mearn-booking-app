import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router";
import { getBookingApi, updateBookingApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Carousel, Input } from "antd";
import iconMap from "../../data/iconMap";
const Booking = () => {
  const stateUser = useSelector((state) => state.UserReducer);
  const { id } = useParams();
  const [data, setData] = useState();
  const [request, setRequest] = useState();
  const [isGuest, setIsGuest] = useState(true);
  const [name, setName] = useState(stateUser?.user?.username || "");
  const [email, setEmail] = useState(stateUser?.user?.email || "");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [infoPrice, setInfoPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [disableButton, setDisablueButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  // const navigate = useNavigation()
  // const [showPopup,setShowPopup] = useState(false)
  useEffect(() => {
    setName(stateUser?.user?.username);
    setEmail(stateUser?.user?.email);
    setPhoneNumber(stateUser?.user?.phoneNumber);
  }, [stateUser]);
  // console.log(data);

  const [nameGuest, setNameGuest] = useState("");
  const navigate = useNavigate();
  const fetchPrice = async (data) => {
    if (data.checkOut && data.checkIn) {
      let tmpInfoPrice = [];
      let tmp = 0;
      const priceExtra = data?.roomType?.priceExtra?.map((i) => ({
        date: new Date(i.start),
        price: i.title,
      }));
      // console.log(priceExtra);

      const checkInDate = new Date(data?.checkIn);
      const checkOutDate = new Date(data?.checkOut);
      const dateArray = [];
      let currentDate = new Date(checkInDate);

      while (currentDate < checkOutDate) {
        dateArray.push(new Date(currentDate)); // Tạo một bản sao mới của currentDate
        currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày lên 1
      }
      setNumberOfDays(dateArray.length);

      dateArray.forEach((date) => {
        const matchingPrice = priceExtra.find(
          (i) => i.date.toDateString() === date.toDateString()
        );
        if (matchingPrice) {
          tmpInfoPrice.push(matchingPrice);
          tmp += matchingPrice.price;
        } else {
          tmp += data?.roomType?.price;
        }
      });
      setInfoPrice(tmpInfoPrice);
      setTotalPrice(tmp);
    }
  };

  const fetchApi = async () => {
    // console.log(id);

    const res = await getBookingApi(id);
    // console.log(res);

    if (res.success) {
      if (res.data.status === "Pending" || res.status === "Confirm") {
        // toast.error("No booking founld");
        navigate("/order/" + res.data._id);
      } else {
        setData(res.data);
        fetchPrice(res.data);
      }
    } else {
      toast.error("No booking founld");
      navigate("/homes");
    }
  };

  useEffect(() => {
    fetchApi();
  }, [id]);

  const handlePayment = async () => {
    setDisablueButton(true);
    if (!name) {
      setDisablueButton(false);
      return toast.error("Please enter your contact’s name");
    }
    if (/\d/.test(name)) {
      setDisablueButton(false);
      return toast.error("Invalid contact’s name");
    }
    if (!email) {
      setDisablueButton(false);
      return toast.error("Please enter your email address.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDisablueButton(false);
      return toast.error("Invalid email address");
    }
    if (!phoneNumber) {

      setDisablueButton(false);
      return toast.error("Please enter your phone number");
    }
    if ( phoneNumber.length < 7 || phoneNumber.length > 15 ) {
      setDisablueButton(false);
      return toast.error("Invalid phone number");
    }
    
    if (!isGuest) {
      if (!nameGuest) {
        setDisablueButton(false);
        return toast.error("Please enter guest name");
      }
      if (/\d/.test(nameGuest)) {
        setDisablueButton(false);
        return toast.error("Invalid guest’s name");
      }
    }

    let dataPayment = {
      name,
      email,
      phoneNumber,
      isGuest,
      checkIn: data?.checkIn,
      checkOut: data?.checkOut,
      roomType: data?.roomType._id,
      guests: data?.guests,
      stepPayment: true,
    };
    if (!isGuest) dataPayment.nameGuest = nameGuest;
    if (request) dataPayment.request = request;

    const res = await updateBookingApi(id, dataPayment);

    if (res.success) {
      toast.success("Continue to Payment");
      setDisablueButton(false);
      navigate(`/payment/${id}`);
    } else {
      setDisablueButton(false);
      return toast.error(res.message);
    }

    setDisablueButton(false);
  };

  return (
    <>
      <div className="container mx-auto  p-10 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-3">
            Your Accommodation Booking
          </h1>
          <p className="text-lg text-[#687176]">
            Make sure all the details on this page are correct before proceeding
            to payment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="left">
            {/* Contact Details */}
            <div className="mb-6 bg-white rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Contact Details (for E-voucher)
                </h2>
                <p className="text-md text-[#687176]">
                  Please fill in all fields correctly to ensure you receive the
                  booking confirmation voucher in your email.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">
                    Contact's Name
                  </label>
                  <Input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Contact's Email Address
                  </label>
                  <Input
                    type="email"
                    className="!w-full border !border-gray-300 !rounded-md !p-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Mobile Number
                  </label>
                  <Input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {!isGuest && (
                  <>
                    <div>
                      <label className="block font-medium mb-1">
                        Guest's Full Name
                      </label>
                      <Input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter guest name"
                        value={nameGuest}
                        onChange={(e) => setNameGuest(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-6">
                  {/* Option 1: I am the guest */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="guestOption"
                      value="guest"
                      className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                      checked={isGuest}
                      onChange={() => setIsGuest(true)}
                    />
                    <span className="text-gray-900 font-medium">
                      I am the guest
                    </span>
                  </label>

                  {/* Option 2: I'm booking for another person */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="guestOption"
                      value="other"
                      className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                      checked={!isGuest}
                      onChange={() => setIsGuest(false)}
                    />
                    <span className="text-gray-900 font-medium">
                      I'm booking for another person
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Requests */}
            <div className="mb-6 bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Let us know if you have any request
              </h2>
              <p className="text-gray-500 mb-4">
                You will know the availability of your additional request during
                check-in. Extra charges may incur but you can still cancel your
                request later.
              </p>

              <div className="mt-4">
                <textarea
                  name="others"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your request"
                ></textarea>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-white shadow-md rounded-lg p-6">
              {/* Price Details Header */}
              <h2 className="text-lg font-semibold mb-4">Price details</h2>
              <p className="text-sm text-gray-500 mb-4">
                Taxes and fees are recovery charges which Traveloka pays to the
                property. If you have any questions regarding tax and invoice,
                please refer to Traveloka Terms and Condition.
              </p>

              {/* Room Price */}
              {numberOfDays - infoPrice.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-900">
                      {data?.roomType?.RoomType} (
                      {numberOfDays - infoPrice.length} Night) Normal
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {numberOfDays - infoPrice.length} x{" "}
                      {new Intl.NumberFormat("en-US").format(
                        data?.roomType?.price
                      )}{" "}
                      VND
                    </p>
                  </div>
                </>
              )}

              {infoPrice?.map((i) => (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-900 flex items-center">
                      {new Date(i.date).toLocaleDateString("en-GB")}{" "}
                      <span className="ml-1 text-blue-500 cursor-pointer">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat("en-US").format(i?.price || 0)} VND
                    </p>
                  </div>
                </>
              ))}

              {/* Taxes and Fees */}

              {/* Divider */}
              <hr className="border-gray-300 mb-4" />

              {/* Total Price */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-gray-900">
                  Total price
                </p>
                <p className="text-2xl font-bold text-orange-500">
                  {new Intl.NumberFormat("en-US").format(totalPrice || 0)} VND
                </p>
              </div>

              {/* Payment Info */}
              <div className="flex items-center text-blue-500 text-sm mb-4">
                <i className="fas fa-clock mr-2"></i>
                <p>You won’t be charged yet!</p>
              </div>

              {/* Continue to Payment Button */}
              <button
                disabled={disableButton}
                onClick={handlePayment}
                className={`w-full bg-orange-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-orange-600 ${
                  disableButton ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Continue to Payment
              </button>
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
                          <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
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
                          <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
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
                <div>
                  <h4 className="font-[500] text-lg mb-4">House rules</h4>
                  <div className="flex flex-col gap-2">
                    {data?.roomType?.hotel?.policy?.map((i) => {
                      if (i.type === "House rules") {
                        return (
                          <div
                            key={i.name}
                            className="w-full flex items-center gap-3"
                          >
                            {i.icon && (
                              <>
                                {React.createElement(iconMap[i?.icon], {
                                  size: 20,
                                })}
                              </>
                            )}
                            <div className="py-2 w-full">
                              <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                {i?.name}
                              </h4>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-[500] mb-4 text-lg">Safety & property</h4>
                  <div className="flex flex-col gap-2">
                    {data?.roomType?.hotel?.policy?.map((i) => {
                      if (i.type === "Safety & property") {
                        return (
                          <div
                            key={i.name}
                            className="w-full flex items-center gap-3"
                          >
                            {i.icon && (
                              <>
                                {React.createElement(iconMap[i?.icon], {
                                  size: 20,
                                })}
                              </>
                            )}
                            <div className="py-2 w-full">
                              <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                {i?.name}
                              </h4>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-[500] mb-4 text-lg">
                    Cancellation policy
                  </h4>
                  <div className="flex flex-col gap-2">
                    {data?.roomType?.hotel?.policy?.map((i) => {
                      if (i.type === "Cancellation policy") {
                        return (
                          <div
                            key={i.name}
                            className="w-full flex items-center gap-3"
                          >
                            {i.icon && (
                              <>
                                {React.createElement(iconMap[i?.icon], {
                                  size: 20,
                                })}
                              </>
                            )}
                            <div className="py-2 w-full">
                              <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                {i?.name}
                              </h4>
                            </div>
                          </div>
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

export default Booking;
