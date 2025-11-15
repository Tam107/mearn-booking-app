import React, { useEffect, useState, useCallback } from "react";
import {
  FaRegShareFromSquare,
  FaRegHeart,
  FaAngleLeft,
  FaAngleRight,
  FaCircleQuestion, // Sửa: dùng FA6
} from "react-icons/fa6";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdApps, MdOutlineReportGmailerrorred } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Spin, Tooltip } from "antd";
import { toast } from "react-hot-toast";
import { createBookingHotelPayment } from "../../../Axios/client/api";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import iconMap from "../../data/iconMap";

const InfoHotel = ({ data }) => {
  // === State ===
  const [showImgRoom, setShowImgRoom] = useState(false);
  const [showDes, setShowDes] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [dataRoom, setDataRoom] = useState({});
  const [totalPriceVND, setTotalPriceVND] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState([]); // [{ date, price }]
  const [disablePaymentButton, setDisablePaymentButton] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("VND");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [pricePerNight, setPricePerNight] = useState(0);

  const navigate = useNavigate();
  const stateRoom = useSelector((state) => state.RoomReducer);

  // === Helpers ===
  const formatDateKey = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

  const formatPrice = (amount, currency) => {
    const locale = currency === "VND" ? "vi-VN" : "de-DE";
    const opts = {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "EUR" ? 2 : 0,
      maximumFractionDigits: currency === "EUR" ? 2 : 0,
    };
    return new Intl.NumberFormat(locale, opts).format(amount);
  };

  // === Fetch Exchange Rate ===
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/booking/exchange-rate");
        const data = await res.json();
        const rate =  data.data.rate;
        setExchangeRate(rate);
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
        toast.error("Không tải được tỷ giá. Chỉ dùng VND.");
      }
    };
    fetchRate();
  }, []);

  // === Select Default Room Type ===
  useEffect(() => {
    if (data?.roomType?.length > 0) {
      setRoomType(data.roomType[0].RoomType);
    }
    setCheckIn("");
    setCheckOut("");
    setNumberOfGuests(1);
    setPriceBreakdown([]);
  }, [data?.roomType]);

  // === Find Room Data from Redux ===
  useEffect(() => {
    const room = stateRoom?.rooms?.find(
        (r) => r.hotel._id === data._id && r.RoomType === roomType
    );
    setDataRoom(room || {});
  }, [stateRoom.rooms, roomType, data._id]);

  // === Calculate Total Price (VND) ===
  const calculatePrice = useCallback(() => {
    if (!checkIn || !checkOut || !dataRoom.price) {
      setTotalPriceVND(0);
      setNumberOfDays(0);
      setPriceBreakdown([]);
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const dates = [];
    let current = new Date(start);

    while (current < end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const extraMap = new Map(
        (dataRoom.priceExtra || []).map((i) => [
          formatDateKey(new Date(i.start)),
          i.price,
        ])
    );

    const breakdown = [];
    let total = 0;

    dates.forEach((date) => {
      const key = formatDateKey(date);
      const price = extraMap.has(key) ? extraMap.get(key) : dataRoom.price;
      total += price;
      breakdown.push({ date: key, price });
    });

    setNumberOfDays(dates.length);
    setPriceBreakdown(breakdown);
    setTotalPriceVND(total);
  }, [checkIn, checkOut, dataRoom]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  // === Update Display Price (VND → EUR) ===
  useEffect(() => {
    if (!totalPriceVND) {
      setDisplayPrice(0);
      return;
    }
    console.log("Exchange rate:", exchangeRate);
    if (selectedCurrency === "VND") {
      setDisplayPrice(totalPriceVND);
    } else if (exchangeRate) {
      setDisplayPrice(Math.round((totalPriceVND / exchangeRate) * 100) / 100);
    }
  }, [totalPriceVND, selectedCurrency, exchangeRate]);

  // === Update Price Per Night ===
  useEffect(() => {
    if (!dataRoom.price) {
      setPricePerNight(0);
      return;
    }
    if (selectedCurrency === "VND") {
      setPricePerNight(dataRoom.price);
    } else if (exchangeRate) {
      setPricePerNight(Math.round((dataRoom.price / exchangeRate) * 100) / 100);
    }
  }, [dataRoom.price, selectedCurrency, exchangeRate]);

  // === Handle Payment ===
  const handlePayment = async () => {
    setDisablePaymentButton(true);
    try {
      if (!checkIn) return toast.error("Vui lòng chọn ngày nhận phòng");
      if (!checkOut) return toast.error("Vui lòng chọn ngày trả phòng");
      if (new Date(checkIn) >= new Date(checkOut))
        return toast.error("Ngày trả phải sau ngày nhận");

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkInDate = new Date(checkIn);
      checkInDate.setHours(0, 0, 0, 0);
      if (today > checkInDate)
        return toast.error("Không thể đặt ngày trong quá khứ");

      if (!numberOfGuests || numberOfGuests <= 0)
        return toast.error("Số khách không hợp lệ");
      if (numberOfGuests > dataRoom.maxPeople)
        return toast.error(`Tối đa ${dataRoom.maxPeople} khách`);

      const payload = {
        guests: numberOfGuests,
        checkIn,
        checkOut,
        roomType: dataRoom._id,
        totalPriceVND,
        selectedCurrency,
      };

      const res = await createBookingHotelPayment(payload);
      if (res.success) {
        navigate(`/booking/${res.data._id}`);
      } else {
        toast.error(res.message || "Thanh toán thất bại");
      }
    } catch (err) {
      toast.error("Lỗi không xác định");
    } finally {
      setDisablePaymentButton(false);
    }
  };

  // === Room Type Change Reset ===
  const handleRoomTypeChange = (value) => {
    setRoomType(value);
    setCheckIn("");
    setCheckOut("");
    setNumberOfGuests(1);
    setPriceBreakdown([]);
  };

  // === Render ===
  return (
      <>
        <div className="w-full">
          <div className="flex items-start justify-between">
            {/* LEFT COLUMN */}
            <div className="flex-1 mr-14">
              {/* Room Type Selector */}
              <div className="flex items-center justify-between border-b-gray-200 border-b-1 pb-4">
                <div className="flex items-center gap-4">
                  <select
                      value={roomType}
                      onChange={(e) => handleRoomTypeChange(e.target.value)}
                      className="w-full px-2 py-2 border border-gray-400 rounded-3xl"
                  >
                    {data?.roomType?.map((type, i) => (
                        <option key={i} value={type.RoomType}>
                          {type.RoomType}
                        </option>
                    ))}
                  </select>
                  <Tooltip title="Thay đổi loại phòng">
                    <FaCircleQuestion size={35} />
                  </Tooltip>
                </div>
              </div>

              {/* Services */}
              <div className="pb-4 border-b-gray-200 border-b-1 pt-4">
                <h3 className="font-[500] text-xl mb-3">Dịch vụ</h3>
                <div className="grid grid-cols-2">
                  {dataRoom?.services?.map((s, i) => (
                      <div key={i} className="w-full flex items-center gap-3">
                        {React.createElement(iconMap[s.icon], { size: 20 })}
                        <div className="py-2">
                          <h4 className="font-[500] text-[16px] leading-[24px]">{s.name}</h4>
                          <p className="font-[400] text-[14px] leading-[20px] text-gray-500">
                            {s.description}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="pb-4 border-b-gray-200 border-b-1 pt-4">
                <h3 className="font-[500] text-xl mb-3">Giới thiệu</h3>
                <div
                    dangerouslySetInnerHTML={{
                      __html:
                          data?.description?.length > 500
                              ? data.description.substring(0, 500) + "..."
                              : data?.description,
                    }}
                />
                {data?.description?.length > 500 && (
                    <div
                        onClick={() => setShowDes(true)}
                        className="flex cursor-pointer items-center gap-1 my-1"
                    >
                      <p className="font-[500] underline">Xem thêm</p>
                      <FaAngleRight />
                    </div>
                )}
              </div>

              {/* Photos */}
              <div className="pb-6 pt-4">
                <h3 className="font-[500] text-[24px] leading-[32px]">Nơi bạn sẽ nghỉ</h3>
                <div className="grid relative gap-2 grid-cols-2">
                  {dataRoom?.photos?.slice(0, 4).map((src, i) => (
                      <img
                          key={i}
                          src={src}
                          alt={`Ảnh phòng ${i + 1}`}
                          className="w-full rounded-2xl aspect-[3/2]"
                      />
                  ))}
                  {dataRoom?.photos?.length > 0 && (
                      <div
                          onClick={() => setShowImgRoom(true)}
                          className="py-2 px-4 bg-white shadow-md border right-4 bottom-3 absolute rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MdApps size={15} />
                        <p className="font-[500] text-[14px] leading-[20px]">Xem tất cả ảnh</p>
                      </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - BOOKING CARD */}
            <div className="w-[360px]">
              <div className="w-full bg-white shadow-xl border border-gray-200 rounded-xl p-6">
                {/* Price per night */}
                <div className="flex items-center justify-between w-full">
                  <div
                      className="font-[400] text-[16px] leading-[24px] text-black truncate flex items-center gap-1"
                      style={{ maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span className="font-[500] text-[20px] leading-[32px] text-black">
                        {exchangeRate === null ? (
                            <Spin size="small" />
                        ) : (
                            formatPrice(pricePerNight, selectedCurrency)
                        )}
                      </span>
                    <span className="text-black">/ night</span>
                  </div>
                </div>

                {/* Check-in / Check-out / Guests */}
                <div className="border my-4 border-gray-300 rounded-md">
                  <div className="flex">
                    <div className="py-1 px-2 w-[50%]">
                      <label>Checkin:</label>
                      <input
                          type="date"
                          className="font-[400] text-[14px] leading-[20px] text-gray-500 w-full"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div className="py-1 px-2 border-l border-gray-200 w-[50%]">
                      <label>Checkout:</label>
                      <input
                          type="date"
                          className="font-[400] text-[14px] leading-[20px] text-gray-500 w-full"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="py-1 px-2 border-t border-gray-200">
                    <label>Number of Guests:</label>
                    <input
                        type="number"
                        min="1"
                        max={dataRoom.maxPeople}
                        className="font-[400] text-[14px] leading-[20px] w-full outline-none text-gray-500"
                        placeholder={`Tối đa ${dataRoom.maxPeople} người`}
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                    disabled={disablePaymentButton}
                    onClick={handlePayment}
                    className={`w-full mb-4 rounded-lg py-3.5 px-4 shadow-md text-white text-center font-[500] text-[14px] leading-[20px] ${
                        disablePaymentButton
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#DE3151] hover:bg-[#c12a47] cursor-pointer"
                    }`}
                >
                  {disablePaymentButton ? "Đang xử lý..." : "Đặt phòng"}
                </button>
                <div className="text-center mb-4">
                  <p className="font-[400] text-[14px] leading-[20px] text-gray-500">
                    You won’t be charged yet
                  </p>
                </div>

                {/* Price Breakdown */}
                {numberOfDays > 0 && (
                    <div className="w-full flex flex-col gap-1 border-b border-gray-200 mb-2 pb-4">
                      {(() => {
                        const normalDays = priceBreakdown.filter((d) => d.price === dataRoom.price).length;
                        const extraDays = priceBreakdown.filter((d) => d.price !== dataRoom.price);

                        return (
                            <>
                              {normalDays > 0 && (
                                  <div className="flex items-center justify-between">
                                    <p className="font-[400] text-[16px] leading-[24px]">
                                      Giá thường ({normalDays} đêm)
                                    </p>
                                    <p className="font-[400] text-[16px] leading-[24px]">
                                      {formatPrice(normalDays * dataRoom.price, "VND")}
                                    </p>
                                  </div>
                              )}
                              {extraDays.map((d, i) => (
                                  <div key={i} className="flex items-center justify-between">
                                    <p className="font-[400] text-[16px] leading-[24px]">
                                      {new Date(d.date).toLocaleDateString("vi-VN")}
                                    </p>
                                    <p className="font-[400] text-[16px] leading-[24px]">
                                      {formatPrice(d.price, "VND")}
                                    </p>
                                  </div>
                              ))}
                            </>
                        );
                      })()}
                    </div>
                )}

                {/* Total */}
                {checkIn && checkOut && (
                    <div className="flex items-center justify-between">
                      <p className="font-[400] text-[16px] leading-[24px]">Tổng cộng</p>
                      <p className="font-[400] text-[16px] leading-[24px]">
                        {formatPrice(displayPrice, selectedCurrency)}
                      </p>
                    </div>
                )}

                {/* Currency Switch */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                      onClick={() => setSelectedCurrency("VND")}
                      className={`px-3 py-1 rounded ${
                          selectedCurrency === "VND" ? "bg-blue-600 text-white" : "bg-gray-200"
                      }`}
                  >
                    VND
                  </button>
                  <button
                      onClick={() => setSelectedCurrency("EUR")}
                      disabled={!exchangeRate}
                      className={`px-3 py-1 rounded ${
                          selectedCurrency === "EUR" ? "bg-blue-600 text-white" : "bg-gray-200"
                      } ${!exchangeRate && "opacity-50 cursor-not-allowed"}`}
                  >
                    EUR
                  </button>
                </div>
              </div>

              {/* Report */}
              <div className="w-full flex items-center justify-center mt-4">
                <MdOutlineReportGmailerrorred size={15} color="#6B7280" />
                <p className="font-[400] text-[14px] leading-[20px] text-[#6B7280]">
                  Báo cáo danh sách này
                </p>
              </div>
            </div>
          </div>

          {/* What this place offers */}
          <div className="pb-6 border-t-gray-200 border-b-gray-200 border-t-1 border-b-1 pt-4">
            <div className="w-full flex flex-col gap-4">
              <h3 className="font-[500] text-[24px] leading-[32px]">Nơi này cung cấp gì</h3>
              <div className="grid gap-2 grid-cols-3">
                {dataRoom?.facilities?.map((i) => (
                    <div key={i._id} className="w-full flex items-center gap-3">
                      {i.icon && React.createElement(iconMap[i.icon], { size: 20 })}
                      <div className="py-2 break-words overflow-hidden text-ellipsis line-clamp-3">
                        <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                          {i?.name}
                        </h4>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* Things to know */}
          <div className="pb-6 max-w-screen border-b-gray-200 border-b-1 pt-4">
            <div className="w-full flex flex-col gap-4">
              <h3 className="font-[500] text-[24px] leading-[32px]">Điều cần biết</h3>
              <div className="grid grid-cols-3 gap-5">
                {["House rules", "Safety & property", "Cancellation policy"].map((type) => (
                    <div key={type} className="w-full">
                      <h4 className="font-[500] text-lg mb-4 w-full">
                        {type === "House rules"
                            ? "Nội quy nhà"
                            : type === "Safety & property"
                                ? "An toàn & tài sản"
                                : "Chính sách hủy"}
                      </h4>
                      <div className="flex flex-col gap-2 w-full">
                        {data?.policy
                            ?.filter((i) => i.type === type)
                            .map((i) => (
                                <div key={i._id} className="w-full flex items-center gap-3">
                                  {i.icon && React.createElement(iconMap[i.icon], { size: 20 })}
                                  <div className="py-2 flex-1 text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                    <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                                      {i?.name}
                                    </h4>
                                  </div>
                                </div>
                            ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL: Show full description */}
        {showDes && (
            <div className="w-full fixed top-0 left-0 h-screen z-50 bg-[#00000042]">
              <div className="mx-auto p-6 w-[60%] h-[60%] rounded-3xl my-40 bg-white overflow-y-auto">
                <div className="w-full flex items-center sticky justify-end top-0 bg-white pb-2">
                  <RxCross1 className="cursor-pointer" onClick={() => setShowDes(false)} size={20} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              </div>
            </div>
        )}

        {/* MODAL: Show all photos */}
        {showImgRoom && (
            <div className="w-full flex flex-col top-0 left-0 fixed h-screen z-50 bg-white">
              <div className="flex mt-4 items-center justify-between px-6 w-full sticky top-0 bg-white z-10 border-b pb-4">
                <FaAngleLeft onClick={() => setShowImgRoom(false)} className="cursor-pointer" size={25} />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <FaRegShareFromSquare size={15} /> Chia sẻ
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegHeart size={15} /> Lưu
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto outline-none p-8">
                <div className="px-52 w-full mt-8">
                  <div className="mx-auto w-[70%] mb-8 flex flex-col gap-2">
                    {dataRoom?.photos?.map((photo, index) => (
                        <img key={index} className="object-cover w-full rounded-xl" src={photo} alt="" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

export default InfoHotel;