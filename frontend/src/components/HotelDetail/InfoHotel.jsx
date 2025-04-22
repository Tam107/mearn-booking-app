import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { useSelector } from "react-redux";
import iconMap from "../../data/iconMap";
import { FaAngleRight, FaQuestionCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Spin, Tooltip } from "antd";
import { toast } from "react-hot-toast";
import { createOtpPayment } from "../../../Axios/client/api";
import { useNavigate } from "react-router";

const InfoHotel = ({ data }) => {
  const [showDes, setShowDes] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [dataRoom, setDataRoom] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [infoPrice, setInfoPrice] = useState([]);
  const [disablePaymentButton, setDisablePaymentButton] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState();
  const fetchPrice = async () => {
    if (checkOut && checkIn) {
      let tmpInfoPrice = [];
      let tmp = 0;
      // console.log(dataRoom);

      const priceExtra = dataRoom.priceExtra.map((i) => ({
        date: new Date(i.start),
        price: i.title,
      }));
      // console.log(priceExtra);

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
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
          tmp += dataRoom.price;
        }
      });
      setInfoPrice(tmpInfoPrice);
      setTotalPrice(tmp);
    }
  };
  const navigate = useNavigate()

  const stateUser=  useSelector(state=>state.UserReducer)
  console.log(stateUser);
  

  const handlePayment =async () => {
    setDisablePaymentButton(true);
    const currenDate = new Date();
    // console.log(currenDate.toDateString()> checkIn);
    // console.log();

    if (!checkIn) {
      setDisablePaymentButton(false);
      return toast.error("Sửa theo ba checkIn");
    }

    if (!checkIn) {
      setDisablePaymentButton(false);
      return toast.error("Sửa theo ba checkIn");
    }

    if (!checkOut) {
      setDisablePaymentButton(false);
      return toast.error("Sửa theo ba checkOut");
    }

    if (checkIn >= checkOut) {
      setDisablePaymentButton(false);
      return toast.error("Ngày check-in phải trước ngày check-out");
    }
    if (currenDate.toDateString() > new Date(checkIn).toDateString()) {
      setDisablePaymentButton(false);
      return toast.error("Sửa theo ba chọn ngày quá khứ");
    }
    if (!numberOfGuests) {
      setDisablePaymentButton(false);
      return toast.error("sửa guest theo ba");
    }
    if (numberOfGuests > dataRoom.maxPeople) {
      setDisablePaymentButton(false);
      return toast.error("sửa maxpeople theo ba");
    }
   
    // if(!stateUser?.isAuthenticated){
    //   setDisablePaymentButton(false);
    //   return toast.error("Please login first");
    // }
     let dataPayment = {
      guests:numberOfGuests,
      checkIn,
      checkOut,
      roomType:dataRoom._id
    }
    const res = await createOtpPayment(dataPayment)
    console.log(res);
    if(res.success){
      navigate("/booking/"+res.data._id)
      setDisablePaymentButton(false);
    }
    else{
      toast.error(res.message)
      setDisablePaymentButton(false);
    }
    


    // console.log(dataPayment);

    setDisablePaymentButton(false);
  };
  // console.log(infoPrice);

  const stateRoom = useSelector((state) => state.RoomReducer);
  useEffect(() => {
    setRoomType(data?.roomType?.[0].RoomType);
    setCheckIn("");
    setCheckOut("");
    // setDataRoom(data?.roomType?.[0]);
  }, [data, data.roomType]);
  useEffect(() => {
    const room = stateRoom?.rooms?.find(
      (room) => room.hotel._id === data._id && room.RoomType === roomType
    );
    setTotalPrice(room?.price || 0);
    setDataRoom(room);
  }, [stateRoom.rooms, roomType]);

  useEffect(() => {
    fetchPrice();
  }, [checkIn, checkOut, roomType, data._id]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-14">
            <div className="flex items-center justify-between border-b-gray-200 border-b-1 pb-4">
              <div className="flex flex-col gap-1">
                {/* <h3 className="font-[500] text-[24px] leading-[32px]">
                  Entire rental unit hosted by Ghazal
                </h3> */}

                <div className="flex items-center gap-4">
                  <select
                    value={roomType}
                    onChange={(e) => {
                      setRoomType(e.target.value); // Cập nhật roomType
                      setCheckIn(""); // Đặt lại checkIn
                      setCheckOut(""); // Đặt lại checkOut
                      setInfoPrice([]);
                      setNumberOfDays(0);
                      setInfoPrice([]);
                      setNumberOfGuests();
                    }}
                    className="w-full px-2 py-2 border border-gray-400 rounded-3xl"
                  >
                    {data?.roomType?.map((type, index) => (
                      <option key={index} value={type.RoomType}>
                        {type.RoomType}
                      </option>
                    ))}
                  </select>
                  <Tooltip title="Change the room type">
                    <FaQuestionCircle size={35} />
                  </Tooltip>
                </div>

                {/* <div className="flex items-center gap-2">
                  <p className="font-[400] text-[14px] leading-[20px]">
                    2 guests
                  </p>
                  <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                  <p className="font-[400] text-[14px] leading-[20px]">
                    1 bedroom
                  </p>
                  <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                  <p className="font-[400] text-[14px] leading-[20px]">1 bed</p>
                  <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                  <p className="font-[400] text-[14px] leading-[20px]">1 bad</p>
                </div> */}
              </div>
            </div>
            <div className="pb-4 border-b-gray-200 border-b-1 pt-4">
              <h3 className="font-[500] text-xl mb-3">Services</h3>
              <div className="grid grid-cols-2">
                {dataRoom?.services?.map((service, index) => (
                  <div key={index} className="w-full flex items-center gap-3">
                    {React.createElement(iconMap[service.icon], { size: 20 })}
                    <div className="py-2">
                      <h4 className="font-[500] text-[16px] leading-[24px]">
                        {service.name}
                      </h4>
                      <p className="font-[400] text-[14px] leading-[20px] text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pb-4 border-b-gray-200 border-b-1 pt-4">
              <div className="w-full">
                <h3 className="font-[500] text-xl mb-3">About me</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.description?.length > 500
                        ? data?.description?.substring(0, 500) + "..."
                        : data?.description,
                  }}
                />
                {data?.description?.length > 500 && (
                  <div
                    onClick={() => setShowDes(true)}
                    className="flex cursor-pointer items-center gap-1 my-1 "
                  >
                    <p className="font-[500] underline">Show more</p>
                    <FaAngleRight />
                  </div>
                )}
              </div>
            </div>
            <div className="pb-6  pt-4">
              <div className="w-full flex flex-col gap-4">
                <h3 className="font-[500] text-[24px] leading-[32px]">
                  Where you’ll sleep
                </h3>
                <div className="grid gap-2 grid-cols-2">
                {dataRoom?.photos?.slice(0, 4).map((i, ind) => (
        <img
          key={ind}
          src={i}
          className="w-full rounded-2xl aspect-[3/2]"
          alt={`Room photo ${ind + 1}`}
        />
      ))}
                  {dataRoom?.photos?.length === 0 && <>NO IMAGES</>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[360px]">
            <div className="w-full bg-white shadow-xl border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between w-full">
                <p
                  className="font-[400] text-[16px] leading-[24px] text-black truncate"
                  style={{
                    maxWidth: "70%", // Giới hạn chiều rộng của giá tiền
                    overflow: "hidden", // Ẩn phần tràn
                    textOverflow: "ellipsis", // Thêm dấu "..." nếu tràn
                    whiteSpace: "nowrap", // Không xuống dòng
                  }}
                >
                  <span className="font-[500] text-[20px] leading-[32px] text-black">
                    {loading ? (
                      <Spin size="small" /> // Hiển thị spinner khi đang loading
                    ) : (
                      `${new Intl.NumberFormat("en-US").format(
                        dataRoom?.price || 0
                      )} VND`
                    )}
                  </span>{" "}
                  / night
                </p>
              </div>
              <div className="border my-4  border-gray-300 rounded-md">
                <div className="flex">
                  <div className="py-1 px-2 w-[50%] ">
                    <label>Check in:</label>
                    <input
                      type="date"
                      className="font-[400] text-[14px] leading-[20px] text-gray-500"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="py-1 px-2 border-l border-gray-200 w-[50%]">
                    <label>Check out:</label>
                    <input
                      type="date"
                      className="font-[400] text-[14px] leading-[20px] text-gray-500"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <div className="py-1 px-2  border-gray-200 border-t">
                  <label>Number of guests:</label>
                  <input
                    type="number"
                    className="font-[400] text-[14px] leading-[20px] w-full outline-none focus:border-none text-gray-500 block"
                    placeholder="2 guests"
                    value={numberOfGuests}
                    onChange={(ev) => setNumberOfGuests(ev.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={disablePaymentButton}
                onClick={handlePayment}
                className={` ${
                  disablePaymentButton ? "cursor-not-allowed" : "cursor-pointer"
                } w-full mb-4 rounded-lg py-3.5 px-4 shadow-md bg-[#DE3151] text-white text-center font-[500] text-[14px] leading-[20px]`}
              >
                Choose
              </button>
              <div className="text-center mb-4">
                <p className="font-[400] text-[14px] leading-[20px] text-gray-500">
                  You won’t be charged yet
                </p>
              </div>
              {numberOfDays > 0 && (
                <>
                  <div className="w-full flex flex-col gap-1 border-b border-gray-200 mb-2 pb-4">
                    <div className="flex items-center justify-between">
                     
                      {
                        numberOfDays - infoPrice.length >0 && (
                          <>
                           <p className="font-[400] text-[16px] leading-[24px]">
                        Normal price days
                      </p>
                      <p className="font-[400] text-[16px] leading-[24px]">
                        {numberOfDays - infoPrice.length} x{" "}
                        {new Intl.NumberFormat("en-US").format(
                          dataRoom?.price || 0
                        )}{" "}
                        VND
                      </p>
                          </>
                        )
                      }
                    </div>
                    {infoPrice.map((i) => (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="font-[400] text-[16px] leading-[24px]">
                            {new Date(i.date).toLocaleDateString("en-GB")}{" "}
                            {/* Định dạng ngày kiểu châu Âu */}
                          </p>
                          <p className="font-[400] text-[16px] leading-[24px]">
                            {new Intl.NumberFormat("en-US").format(
                              i?.price || 0
                            )}{" "}
                            VND
                          </p>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
              {checkIn && checkOut && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="font-[400] text-[16px] leading-[24px]">
                      Total
                    </p>
                    <p className="font-[400] text-[16px] leading-[24px]">
                      {" "}
                      {new Intl.NumberFormat("en-US").format(
                        totalPrice || 0
                      )}{" "}
                      VND
                    </p>
                  </div>
                </>
              )}
            </div>
            <br />
            <div className="w-full flex items-center justify-center">
              <MdOutlineReportGmailerrorred size={15} color="#6B7280" />

              <p className="font-[400] text-[14px] leading-[20px] text-[#6B7280]">
                Report this listing
              </p>
            </div>
          </div>
        </div>
        <div className="pb-6 border-t-gray-200 border-b-gray-200 border-t-1 border-b-1  pt-4">
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-[500] text-[24px] leading-[32px]">
              What this place offers
            </h3>
            <div className="grid gap-2 grid-cols-3">
              {dataRoom?.facilities?.map((i) => (
                <>
                  <div className="w-full flex items-center gap-3">
                    {i.icon && (
                      <>
                        {React.createElement(iconMap[i?.icon], {
                          size: 20,
                        })}
                      </>
                    )}{" "}
                    <div className="py-2">
                      <h4 className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
                        {i?.name}
                      </h4>
                    </div>
                  </div>{" "}
                </>
              ))}
              
            </div>
          </div>
        </div>
        <div className="pb-6 border-b-gray-200 border-b-1  pt-4">
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-[500] text-[24px] leading-[32px]">
              Things to know
            </h3>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-[500] text-lg mb-4">House rules</h4>
                <div className="flex flex-col gap-2">
                  {data?.policy?.map((i) => {
                    if (i.type === "House rules") {
                      // console.log(i?.icon, "icon");

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

                            <div className="py-2">
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
              <div>
                <h4 className="font-[500] mb-4 text-lg">Safety & property</h4>
                <div className="flex flex-col gap-2">
                  {data?.policy?.map((i) => {
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

                            <div className="py-2">
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
              <div>
                <h4 className="font-[500] mb-4 text-lg">Cancellation policy</h4>
                <div className="flex flex-col gap-2">
                  {data?.policy?.map((i) => {
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

                            <div className="py-2">
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
            </div>
          </div>
        </div>
      </div>
      {showDes === true && (
        <>
          <div className="w-full fixed top-0 left-0 h-screen z-50 bg-[#00000042]">
            <div className="mx-auto p-6 w-[60%] h-[60%]   rounded-3xl my-40 bg-white">
              <div className="w-full flex items-center sticky justify-end">
                <RxCross1
                  className="cursor-pointer"
                  onClick={() => setShowDes(false)}
                  size={20}
                />
              </div>
              <div
                className="overflow-y-scroll h-full"
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InfoHotel;
