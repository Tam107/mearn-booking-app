import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllFacilitiesApi, getAllServicesApi } from "../../../Axios/client/api";
import iconMap from "../../data/iconMap";

const AdminEditRoomDetail = () => {
  const { slug } = useParams();
  const stateRoom = useSelector((state) => state.RoomReducer);
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [price, setPrice] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [roomType, setRoomType] = useState();
  const [services, setServices] = useState([]);

  const [data, setData] = useState();
  const [hotelId, setHotelId] = useState();
    const [showModel, setShowModel] = useState(false);
    const [servicesDefault, setServicesDefault] = useState([]);
  
  useEffect(() => {
    const tmp = stateRoom?.rooms?.find((item) => item.slug === slug);
    if (tmp) {
      setData(tmp);
      setPrice(tmp?.price);
      setMaxPeople(tmp?.maxPeople);
      setRoomType(tmp?.RoomType);
      setHotelId(tmp?.hotel);
      setServices(tmp?.services?.map((item) => item._id));
      
    }
  }, [slug, stateRoom]);
  console.log(services);
  console.log(servicesDefault);
  
  
  useEffect(() => {
    const alo = async () => {
      const ad = await getAllServicesApi();
      setServicesDefault(ad.data);
    };
    const ola = async () => {
      const ad = await getAllFacilitiesApi();

    //   setFacilitiesDefault(ad.data ? ad.data : []);
    };
    alo();
    ola();
  }, [showModel]);

  return (
    <>
      <div className="w-full flex items-center justify-between py-6 px-6">
        <h2 className="font-[600] flex  leading-[40px] text-gray-600 text-[36px]">
          Edit Room Detail
        </h2>
      </div>
      <div className="w-full  px-6 py-6  ">
        <div className="w-full  border border-gray-300 rounded-2xl py-4 px-4">
          <div className="w-full mb-4 border-gray-300 pb-4 border-b ">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Room Picture</h2>
              <Tooltip title="Where the customer sleeps">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div className="grid gap-2 mt-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              {data?.photos?.length > 0 &&
                photos.map((item, index) => (
                  <>
                    <div key={index} className="h-32 relative flex ">
                      <img
                        src={item}
                        className="rounded-2xl w-full object-cover"
                      />
                    </div>
                  </>
                ))}
              {data?.photos?.length === 0 && <>NO IMG</>}
            </div>
          </div>

          <div className="w-full  mb-4 border-gray-300 pb-4 border-b">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Room Deatails</h2>
              <Tooltip title="Nghĩ span giúp Vĩnh">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div className="grid gap-4 grid-cols-4">
              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Hotel <span className="text-red-500">*</span>{" "}
                </p>
                <select
                  value={hotelId?._id}
                  onChange={(e) => setHotelId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                >
                  <option value="">Select hotel</option>
                  {stateHotels?.hotels?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Room price per night <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Room Type <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                  type="text"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="Room Type"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                  Room Capacity <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                  type="number"
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(e.target.value)}
                  placeholder="2-4 guests"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 border-gray-300 pb-4 border-b w-full">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Services</h2>
              <Tooltip title="Should choose room type first">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div
                onClick={() => setShowModel(true)}
                className="cursor-pointer h-24 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center"
              >
                <IoCloudUploadOutline />
                Create service
              </div>

              {servicesDefault?.length > 0 && (
                <>
                  {servicesDefault.map((service, index) => (
                    <label className="cursor-pointer h-24 border border-gray-300 p-4 flex rounded-2xl gap-2 items-center">
                      <input
                        onChange={() => handleServiceChange(service._id)}
                        type="checkbox"
                        className="mr-2"
                        checked={services.includes(service._id)}
                      />

                      <span className="mr-2">
                        {iconMap[service.icon]
                          ? React.createElement(iconMap[service.icon])
                          : null}
                      </span>

                      <span>{service.name}</span>
                    </label>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* <div className="mb-4 border-gray-300 pb-4 border-b w-full">
            <div className="flex items-center justify-between">
              <div className="flex mb-3 items-center gap-4">
                <h2 className="font-medium text-lg ">Facilities</h2>
                <Tooltip title="Should choose room type first">
                  <FaQuestionCircle size={23} />
                </Tooltip>
              </div>
              <div className="flex items-center gap-x-2">
               
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {facilitiesDefault?.map((item, index) => (
                <>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={data?.facilities.includes(item._id)}
                      onChange={() => handleFaChange(item._id)}
                    />
                    <span className="ml-2">{item.name}</span>
                  </label>
                </>
              ))}
            </div>
          </div> */}

          {/* <div className="mb-4 border-gray-300 pb-4 border-b w-full">
            <h2 className="font-medium text-lg mb-2">Short Description</h2>
            <Editor
              apiKey="izl72j5zg9fjcr0551e6p3vrd6gpctfwcer7okoq9iqtsxk4" // Optional: API key if you want to use TinyMCE Cloud
              value={data?.description}
             
              init={{
                valid_elements: "*[*]",
                height: 400,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "textcolor", // Thêm plugin textcolor để hỗ trợ màu chữ
                ],
                toolbar:
                  "undo redo | formatselect | bold italic forecolor backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help",
              }}
            />
          </div> */}

          {/* <div className="mb-4  w-full">
            <div className="flex mb-3 items-center gap-4">
              <h2 className="font-medium text-lg ">Price extra</h2>
              <Tooltip title="Nên set theo ngày việt nam">
                <FaQuestionCircle size={23} />
              </Tooltip>
            </div>
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                display: "flex",
                gap: "30px",
              }}
            >
              <Calendar
                events={eventsDefault} // Sự kiện được truyền vào lịch
                localizer={localizer}
                startAccessor="start" // Trường 'start' trong sự kiện được sử dụng làm thời gian bắt đầu
                endAccessor="end" // Trường 'end' trong sự kiện được sử dụng làm thời gian kết thúc
                defaultView="month"
                views={["month"]}
                style={{ height: "500px", width: "100%" }} // Sử dụng width 'max-content' để lịch không bị co lại
                components={{
                  event: CustomEvent, // Ghi đè cách hiển thị sự kiện
                }}
              />
              
            </div>
          </div> */}
        </div>
        {/* <div className="w-full flex mt-2 items-center justify-center cursor-pointer">
          <CiCircleChevUp onClick={handleUp} size={40} />
        </div>{" "} */}
      </div>
    </>
  );
};

export default AdminEditRoomDetail;
