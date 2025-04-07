import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { useSelector } from "react-redux";
import iconMap from "../../data/iconMap";
import { FaAngleRight } from "react-icons/fa";
const InfoHotel = ({ data }) => {
  const [roomType, setRoomType] = useState("");
  const [dataRoom, setDataRoom] = useState({});
  console.log(dataRoom);

  const stateRoom = useSelector((state) => state.RoomReducer);
  useEffect(() => {
    setRoomType(data?.roomType?.[0].RoomType);
    // setDataRoom(data?.roomType?.[0]);
  }, [data, data.roomType]);
  useEffect(() => {
    const room = stateRoom?.rooms?.find(
      (room) => room.hotel._id === data._id && room.RoomType === roomType
    );
    setDataRoom(room);
  }, [stateRoom.rooms, roomType]);


  console.log(data);

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

                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-400 rounded-3xl"
                >
                  {data?.roomType?.map((type, index) => (
                    <option key={index} value={type.RoomType}>
                      {type.RoomType}
                    </option>
                  ))}
                </select>

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
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.description?.length > 500
                        ? data?.description?.substring(0, 500) + "..."
                        : data?.description,
                  }}
                />
                {data?.description?.length > 500 && (
                  <div className="flex cursor-pointer items-center gap-1 my-1 ">
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
                  {dataRoom?.photos?.map((i, ind) => (
                    <>
                      <img
                        key={ind}
                        src={i}
                        className="w-full rounded-2xl aspect-[3/2]"
                        alt=""
                      />
                    </>
                  ))}
                  {dataRoom?.photos?.length === 0 && <>NO IMAGES</>}
                </div>
              </div>
            </div>
            
          </div>
          <div className="w-[360px]">
            <div className="w-full bg-white shadow-xl border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between w-full">
                <p className="font-[400] text-[16px] leading-[24px] text-black">
                  <span className="font-[500] text-[20px] leading-[32px] text-black">
                    {new Intl.NumberFormat("en-US").format(data?.cheapestPrice)}
                    {" VND"}
                  </span>{" "}
                  / night
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <FaRegStar color="#DE3151" size={15} />
                    <p className="font-[500] text-[14px] leading-[20px]">
                      {data?.rating}
                    </p>
                  </div>
                  <div className="w-[2px] h-[2px] rounded-full bg-gray-500"></div>
                  <div className="flex items-center gap-1">
                    <p className="font-[500] text-[14px] leading-[20px] underline">
                      {data?.numberRating} reviews
                    </p>
                  </div>
                </div>
              </div>
              <div className="border my-4  border-gray-300 rounded-md">
                <div className="flex">
                  <div className="py-1 px-2 w-[50%] ">
                    <label>Check in:</label>
                    <input
                      type="date"
                      className="font-[400] text-[14px] leading-[20px] text-gray-500"
                      // value={checkIn}
                      // onChange={ev => setCheckIn(ev.target.value)}
                    />
                  </div>
                  <div className="py-1 px-2 border-l border-gray-200 w-[50%]">
                    <label>Check out:</label>
                    <input
                      type="date"
                      className="font-[400] text-[14px] leading-[20px] text-gray-500"
                      //  value={checkOut}
                      // onChange={ev => setCheckOut(ev.target.value)}
                    />
                  </div>
                </div>
                <div className="py-1 px-2  border-gray-200 border-t">
                  <label>Number of guests:</label>
                  <input
                    type="number"
                    className="font-[400] text-[14px] leading-[20px] text-gray-500 block"
                    placeholder="2 guests"
                    // value={numberOfGuests}
                    // onChange={ev => setNumberOfGuests(ev.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4 rounded-lg py-3.5 px-4 shadow-md bg-[#DE3151] text-white text-center font-[500] text-[14px] leading-[20px]">
                Reserve
              </div>
              <div className="text-center mb-4">
                <p className="font-[400] text-[14px] leading-[20px] text-gray-500">
                  You won’t be charged yet
                </p>
              </div>
              {/* <div className="w-full flex flex-col gap-1 border-b border-gray-200 mb-2 pb-4">
                <div className="flex items-center justify-between">
                  <p className="font-[400] text-[16px] leading-[24px]">
                    $79 x 7 nights
                  </p>
                  <p className="font-[400] text-[16px] leading-[24px]">$555</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-[400] text-[16px] leading-[24px]">
                    Weekly discount
                  </p>
                  <p className="font-[400] text-[16px] leading-[24px] text-[#10B981]">
                    -$28
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-[400] text-[16px] leading-[24px]">
                    $79 x 7 nights
                  </p>
                  <p className="font-[400] text-[16px] leading-[24px]">$555</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-[400] text-[16px] leading-[24px]">
                    Cleaning fee
                  </p>
                  <p className="font-[400] text-[16px] leading-[24px]">$62</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-[400] text-[16px] leading-[24px]">
                    Service fee
                  </p>
                  <p className="font-[400] text-[16px] leading-[24px]">$62</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-[400] text-[16px] leading-[24px]">
                    Occupancy taxes and fees
                  </p>
                  <p className="font-[400] text-[16px] leading-[24px]">$62</p>
                </div>
              </div> */}
              <div className="flex items-center justify-between">
                <p className="font-[400] text-[16px] leading-[24px]">Total</p>
                <p className="font-[400] text-[16px] leading-[24px]">
                  {" "}
                  {new Intl.NumberFormat("en-US").format(data?.cheapestPrice)}
                  {" VND"}
                </p>
              </div>
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
                  {
                    dataRoom?.facilities?.map(i=>(
                      <>
                        <p className="text-md">{i.name}</p>
                      </>
                    ))
                  }
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
                    <h4 className="font-[500] text-lg mb-4">House rules
                    </h4>
                    <div className="flex flex-col gap-2">
                      {
                          data?.policy?.map(i=>{
                            if(i.type === 'House rules'){
                              return <>
                                <p className="text-md">{i.name}</p>
                              </>
                            }
                          })
                      }
                    </div>
                  </div>
                  <div>
                    <h4 className="font-[500] mb-4 text-lg">Safety & property
                    </h4>
                    <div className="flex flex-col gap-2">
                      {
                          data?.policy?.map(i=>{
                            if(i.type === 'Safety & property'){
                              return <>
                                <p className="text-md">{i.name}</p>
                              </>
                            }
                          })
                      }
                    </div>
                  </div>
                  <div>
                    <h4 className="font-[500] mb-4 text-lg">Cancellation policy

                    </h4>
                    <div className="flex flex-col gap-2">
                      {
                          data?.policy?.map(i=>{
                            if(i.type === 'Cancellation policy'){
                              return <>
                                <p className="text-md">{i.name}</p>
                              </>
                            }
                          })
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

export default InfoHotel;
