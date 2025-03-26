import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { useSelector } from "react-redux";
import iconMap from "../../data/iconMap";
const InfoHotel = ({ data }) => {
    const [roomType, setRoomType] = useState('');
    const [dataRoom,setDataRoom]=useState({});
    const stateRoom = useSelector(state => state.RoomReducer);
    useEffect(() => {
        setRoomType(data?.roomType?.[0]);
        
    }, [data]);
    useEffect(() => {
        const room = stateRoom?.rooms?.find(room => room.hotel._id === data._id && room.RoomType === roomType);
        setDataRoom(room);
    }, [stateRoom.rooms, roomType]);

    console.log(data?.description);

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
                  {/* <option value="">Select City</option> */}
                  {data?.roomType?.map((type,index) => (
                    <option key={index} value={type}>
                      {type}
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
              <div className="w-[50%] flex flex-col gap-4">
                
                
                {
                    dataRoom?.services?.map((service,index)=>(
                        <div key={index} className="w-full flex items-center gap-3">
                          {React.createElement(iconMap[service.icon], { size: 20 })}
                        <div>
                          <h4 className="font-[500] text-[16px] leading-[24px]">
                            {service.name}
                          </h4>
                          <p className="font-[400] text-[14px] leading-[20px] text-gray-500">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))
                }
              
              </div>
            </div>
            <div className="pb-4 border-b-gray-200 border-b-1 pt-4">
              <div className="w-full">
              <div
  
  dangerouslySetInnerHTML={{ __html: data.description }}
/>
              </div>
            </div>
            <div className="pb-4 border-b-gray-200 border-b-1 pt-4">
              <div className="w-[50%] flex flex-col gap-4">
                <h3 className="font-[500] text-[24px] leading-[32px]">
                  Where you’ll sleep
                </h3>
                <div>
                  <img
                    className="w-[320px] rounded-lg aspect-[3/2] "
                    src="https://s3-alpha-sig.figma.com/img/91d6/ccd9/96e5b436aa98cbfacf7fc152380f2a69?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XZW86VFe-srTvaVuCGF7ngAsB-8K5WOpHzZik7oJdx1MbSgatCeVH6RxrhlOTUovLrPPZHptnLusJ7B5s7IV3eI~EIJZCDIroP5v5J244e7uARAJjFu-Prb1-SZsj~H4x1zVKhQYEORT90NZz8Ek0fGW0whewErW5Ke5OrBjGmWJC37HN~Lbr7BN68BfrUTLjA286ZEcQ4mfPyGiewdHl7RIXcF4Cqh-HaDkCZdQH~48z9OSfrpClwGuL4BVE2VTFgRFacBtaBNIcvFvSHGY86yVMrckHRTjL46~x1yfJIzUe-xneL85DrJLHbE5~0OyVi6oxOFlteEVdSi0yb0U-g__"
                    alt=""
                  />
                  <h3 className="font-[500] text-[16px] leading-[24px]">
                    Bedroom
                  </h3>
                  <p className="font-[400] text-[14px] leading-[20px]">
                    1 queen bed
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[360px]">
            <div className="w-full bg-white shadow-xl border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between w-full">
                <p className="font-[400] text-[16px] leading-[24px] text-black">
                  <span className="font-[500] text-[20px] leading-[32px] text-black">
                  {new Intl.NumberFormat("en-US").format(data?.cheapestPrice)}{" VND"}
                  </span>{" "}
                  / night
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <FaRegStar color="#DE3151" size={15} />
                    <p className="font-[500] text-[14px] leading-[20px]">{data?.rating}</p>
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
                <p className="font-[400] text-[16px] leading-[24px]"> {new Intl.NumberFormat("en-US").format(data?.cheapestPrice)}{" VND"}</p>
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
      </div>
    </>
  );
};

export default InfoHotel;
