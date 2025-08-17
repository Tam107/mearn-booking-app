import React, { use, useEffect, useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Country, State } from "country-state-city";
import { useMediaQuery } from "react-responsive";
import { Input, Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { uploadByFilesApi } from "../../../Axios/client/api";
import ModalBoardingArrive from "./ModalBoardingArrive";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BoardingArrive from "./BoardingArrive";
import { MdOutlineBusAlert } from "react-icons/md";

const AdminCreateBus = () => {
  //default values
  const cities = State.getStatesOfCountry("VN");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [modalBoardingPoint, setModalBoardingPoint] = useState(false);
  const [modalArrivalPoint, setModalArrivalPoint] = useState(false);
  const stateBus = useSelector((state) => state.BusReducer);

  // State save
  const [cityFrom, setCityFrom] = useState("");
  const [cityTo, setCityTo] = useState("");
  const [photos, setPhotos] = useState([]);
  const [boarding, setBoarding] = useState([]);
  const [arrival, setArrival] = useState([]);
  // useEffect
  useEffect(() => {
    if (stateBus?.boardingPointsAdmin?.length > 0 && cityFrom) {
      setBoarding(
        stateBus?.boardingPointsAdmin.filter((item) => item.city === cityFrom)
      );
    }
    if (stateBus?.arrivalPointsAdmin?.length > 0 && cityTo) {
      setArrival(
        stateBus?.arrivalPointsAdmin.filter((item) => item.city === cityTo)
      );
    }
  }, [stateBus, stateBus?.boardingPointsAdmin, stateBus?.arrivalPointsAdmin, cityFrom, cityTo]);
  useEffect(() => {
    if (stateBus?.arrivalPointsAdmin?.length > 0 && cityTo) {
      setArrival(
        stateBus?.arrivalPointsAdmin.filter((item) => item.city === cityTo)
      );
    }
  }, [stateBus, stateBus?.arrivalPointsAdmin, cityTo]);

  //function
  function removePhoto(filename) {
    // ev.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== filename)]);
  }
  const addPhotoByFile = async (ev) => {
    // ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    // console.log("ok");

    const res = await uploadByFilesApi(data);

    if (res.success) {
      const newImg = res.data.map((item) => item.url);
      setPhotos([...photos, ...newImg]);
    } else {
      toast.error("Error");
    }
  };
  return (
    <>
      {/* Header */}
      <div className="w-full pt-6 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-[600] text-gray-600 text-[28px] md:text-[36px] leading-[36px] md:leading-[40px] cursor-pointer">
          Create new bus
        </h2>
        <div className="cursor-pointer transition duration-200 bg-[#98A1AE] rounded-3xl hover:bg-[#c4c7cd] px-4 py-2 flex items-center gap-2 md:gap-4">
          <TiPlusOutline color="white" size={20} />

          <p className="text-white text-md">Add a new bus</p>
        </div>
      </div>
      <div className="w-full px-6 py-6">
        {/* Bus Pictures */}
        <div className="w-full border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Bus Picture</h2>
          </div>
          <div className="grid gap-2 mt-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            <label className="border border-gray-300 border-dashed cursor-pointer bg-transparent rounded-2xl p-6 flex items-center justify-center text-2xl text-gray-600">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={addPhotoByFile}
              />
              <IoCloudUploadOutline />
              Upload
            </label>

            {photos.length > 0 &&
              photos.map((item, index) => (
                <div key={index} className="h-32 relative flex">
                  <img src={item} className="rounded-2xl w-full object-cover" />
                  <div
                    onClick={() => removePhoto(item)}
                    className="absolute top-0 right-0 w-6 h-6 text-sm flex items-center justify-center text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition z-50 duration-300"
                  >
                    X
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Bus Details */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Ticket Details</h2>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                From <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px]"
              >
                <IoIosArrowDropright
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <select
                  value={cityFrom}
                  onChange={(e) => setCityFrom(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="" className="text-gray-300 text-sm"></option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg">
                To <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px]"
              >
                <IoIosArrowDropleft
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <select
                  value={cityTo}
                  onChange={(e) => setCityTo(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="" className="text-gray-300 text-sm"></option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Total Seat <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px]"
              >
                <MdOutlineBusAlert
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <Input
                  className="!border-0 !focus:outline-none hover:!border-0 hover:!shadow-none"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Boarding point */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Select boarding point</h2>
            {!isMobile && (
              <Tooltip title="Select from address first">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="grid gap-2 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div
              onClick={() => {
                cityFrom
                  ? setModalBoardingPoint(true)
                  : toast.error("Please select a city from first");
              }}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create boarding point
            </div>

            {boarding?.length > 0 ? (
              boarding.map((item, index) => (
                <BoardingArrive data={item} key={item._id} isBoarding={true} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No boarding points available for this city.
              </p>
            )}
          </div>
        </div>

        {/* Arrival point */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Select arrival point</h2>
            {!isMobile && (
              <Tooltip title="Select to address first">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="grid gap-2 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div
              onClick={() => {
                cityTo
                  ? setModalArrivalPoint(true)
                  : toast.error("Please select a city to first");
              }}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create arrival point
            </div>

            {arrival?.length > 0 ? (
              arrival.map((item, index) => (
                <BoardingArrive data={item} key={item._id} isBoarding={false} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No arrival points available for this city.
              </p>
            )}

            {/* {servicesDefault?.length > 0 && (
              <Services
                handleServiceChange={handleServiceChange}
                setServicesDefault={setServicesDefault}
                servicesDefault={servicesDefault}
                services={services}
              />
            )} */}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalBoardingPoint && (
        <ModalBoardingArrive
          isBoarding={true}
          setShowModel={setModalBoardingPoint}
          city={cityFrom}
        />
      )}

      {/* Modals */}
      {modalArrivalPoint && (
        <ModalBoardingArrive
          isBoarding={false}
          setShowModel={setModalArrivalPoint}
          city={cityTo}
        />
      )}
    </>
  );
};

export default AdminCreateBus;
