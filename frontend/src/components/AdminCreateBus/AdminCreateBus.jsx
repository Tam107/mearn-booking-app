import React, { useEffect, useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { Checkbox, Input, Radio, TimePicker, Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import {
  busAdminApi,
  getAllFacilitiesApi,
  uploadByFilesApi,
} from "../../../Axios/client/api";
import ModalBoardingArrive from "./ModalBoardingArrive";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import BoardingArrive from "./BoardingArrive";
import { MdOutlineBusAlert } from "react-icons/md";
import { CiCircleChevUp, CiMoneyCheck1, CiReceipt } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { PiSeatThin } from "react-icons/pi";
import Facilities from "../Facilities/Facilities";
import ModelCreateFacility from "../ModelCreateFacility/ModelCreateFacility";
import EditorTiny from "../EditorTiny/EditorTiny";
import { createBusAdminAction } from "../../redux/actions/BusAction";
import BusInputDestination from "./BusInputDestination";
import UploadImg from "../UploadImg/UploadImg";
const AdminCreateBus = () => {
  const dispatch = useDispatch();
  //default values
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [modalBoardingPoint, setModalBoardingPoint] = useState(false);
  const [facilitiesDefault, setFacilitiesDefault] = useState([]);
  const [modalArrivalPoint, setModalArrivalPoint] = useState(false);
  const [boardingDefault, setBoardingDefault] = useState([]);
  const [arrivalDefault, setArrivalDefault] = useState([]);
  const stateBus = useSelector((state) => state.BusReducer);

  // State save
  const [cityFrom, setCityFrom] = useState("");
  const [cityTo, setCityTo] = useState("");
  const [photos, setPhotos] = useState([]);
  const [boarding, setBoarding] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [departureTime, setDepartureTime] = useState();
  const [arrivalTime, setArrivalTime] = useState();
  const [showCreateFacility, setShowCreateFacility] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [totalSeats, setTotalSeats] = useState("");
  const [poName, setPoName] = useState("");
  const [seat, setSeat] = useState([]);
  const [price, setPrice] = useState(0);
  const [policy1, setPolicy1] = useState("");
  const [policy2, setPolicy2] = useState("");
  const [policy, setPolicy] = useState([]);
  const [conditions, setConditions] = useState("");

  // useEffect
  useEffect(() => {
    if (stateBus?.boardingPointsAdmin?.length > 0 && cityFrom) {
      setBoardingDefault(
        stateBus?.boardingPointsAdmin.filter((item) => item.city === cityFrom)
      );
    }
  }, [stateBus?.boardingPointsAdmin, cityFrom]);
  useEffect(() => {
    if (stateBus?.arrivalPointsAdmin?.length > 0 && cityTo) {
      setArrivalDefault(
        stateBus?.arrivalPointsAdmin.filter((item) => item.city === cityTo)
      );
    }
  }, [stateBus?.arrivalPointsAdmin, cityTo]);

  useEffect(() => {
    const getDefaultFaicily = async () => {
      const data = await getAllFacilitiesApi();
      setFacilitiesDefault(
        data.data ? data.data.filter((item) => item?.isBus === true) : []
      );
    };
    getDefaultFaicily();
  }, [showCreateFacility]);

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

    const res = await uploadByFilesApi(data);

    if (res.success) {
      const newImg = res.data.map((item) => item.url);
      setPhotos([...photos, ...newImg]);
    } else {
      toast.error("Error");
    }
  };
  const handleFaChange = (id) => {
    const isExist = facilities.find((i) => i === id);
    if (isExist) {
      const tmp = facilities.filter((i) => i != id);
      setFacilities(tmp);
    } else {
      return setFacilities([...facilities, id]);
    }
  };
  const handleUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // This enables the smooth scrolling effect
    });
  };
  const [loading, setLoading] = useState(false); // Loading state for the button

  const navigate = useNavigate();
  const addBus = async () => {
    if (
      !cityFrom ||
      !cityTo ||
      !departureTime ||
      !arrivalTime ||
      boarding.length === 0 ||
      arrival.length === 0 ||
      !policy1 ||
      !policy2
    ) {
      return toast.error("Please fill in all required fields");
    }
    if (arrival.length > 1) {
      return toast.error("Only choose one Arrival Point");
    }
    const data = {
      photos,
      cityFrom,
      cityTo,
      departureTime,
      arrivalTime,
      totalSeats,
      poName,
      seat,
      price,
      policy: [policy1, policy2],
      boarding: boarding,
      arrival: arrival,
      facilities,
      conditions,
    };
    setLoading(true);

    try {
      const dataResponse = await busAdminApi("createBus", "post", data);

      if (dataResponse.success) {
        toast.success("Create bus successfully");
        dispatch(createBusAdminAction(dataResponse));
        navigate("/dashboard-view-bus");
      } else {
        toast.error(dataResponse.message || "Error creating bus");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false); // Re-enable the button after the API call
    }
  };
  return (
    <>
      {/* Header */}
      <div className="w-full pt-6 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-[600] text-gray-600 text-[28px] md:text-[36px] leading-[36px] md:leading-[40px] cursor-pointer">
          Create new bus
        </h2>
        <div
          onClick={addBus}
          className="cursor-pointer transition duration-200 bg-[#98A1AE] rounded-3xl hover:bg-[#c4c7cd] px-4 py-2 flex items-center gap-2 md:gap-4"
        >
          {loading ? (
            <div className="loader"></div> // Custom loading spinner or you can use a library spinner
          ) : (
            <TiPlusOutline color="white" size={20} />
          )}

          <p className="text-white text-md">
            {loading ? "Creating Bus..." : "Add a new bus"}
          </p>
        </div>
      </div>
      <div className="w-full px-6 py-6">
        {/* Bus Pictures */}
        <div className="w-full border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Bus Picture</h2>
          </div>
          <UploadImg addPhotoByFile={addPhotoByFile} removePhoto={removePhoto} photos={photos}/>
        </div>

        {/* Bus Details */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Ticket Details</h2>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <BusInputDestination
              value={cityFrom}
              setData={setCityFrom}
              type={"From"}
              setPoint={setBoarding}
            />
            <BusInputDestination
              value={cityTo}
              setData={setCityTo}
              type={"To"}
              setPoint={setArrival}
            />
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Departure Time <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px]"
              >
                <GoClock
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <TimePicker
                  className="flex-1 !bg-[#F9FAFB] !border-0 !focus:outline-none hover:!border-0 hover:!shadow-none"
                  format="HH:mm"
                  value={departureTime}
                  onChange={(time) => {
                    setDepartureTime(time);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Arrival Time <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px]"
              >
                <GoClock
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <TimePicker
                  className="flex-1 !bg-[#F9FAFB] !border-0 !focus:outline-none hover:!border-0 hover:!shadow-none"
                  format="HH:mm"
                  value={arrivalTime}
                  onChange={(time) => {
                    setArrivalTime(time);
                  }}
                />
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
                  className="!border-0 !bg-[#F9FAFB] !focus:outline-none hover:!border-0 hover:!shadow-none"
                  type="number"
                  placeholder="40"
                  value={totalSeats}
                  onChange={(e) =>
                    setTotalSeats(
                      e.target.value ? parseInt(e.target.value, 10) : 0
                    )
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                PO Name <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px]"
              >
                <CiReceipt
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <Input
                  placeholder="Limousine"
                  className="!border-0 !bg-[#F9FAFB] !focus:outline-none hover:!border-0 hover:!shadow-none"
                  value={poName}
                  onChange={(e) => setPoName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Seat(s) <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] gap-2 flex relative border-[1px] items-center"
              >
                <PiSeatThin
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <Checkbox.Group
                  className="!border-0 !bg-[#F9FAFB] !focus:outline-none hover:!border-0 hover:!shadow-none"
                  value={seat}
                  onChange={(e) => {
                    setSeat(e);
                  }}
                >
                  <Checkbox value="1">1-1</Checkbox>
                  <Checkbox value="2">2-2</Checkbox>
                  {/* <Checkbox value="WC">WC</Checkbox> */}
                </Checkbox.Group>{" "}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Price <span className="text-red-500">*</span>
              </p>
              <div
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                className="rounded-[4px] flex relative border-[1px] items-center"
              >
                <CiMoneyCheck1
                  style={{ borderColor: "rgba(180, 180, 180, 1)" }}
                  className="size-8 border-r-[1px]"
                />
                <Input
                  type="number"
                  className="!border-0 !bg-[#F9FAFB] !focus:outline-none hover:!border-0 hover:!shadow-none"
                  placeholder="500$"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value ? parseInt(e.target.value, 10) : 0)
                  }
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <p className="text-lg">Refund & Reschedule Policy</p>
              <div
                className="gap-8 flex"
                style={{ borderColor: "rgba(180, 180, 180, 1)" }}
              >
                <Radio.Group
                  value={policy1}
                  onChange={(e) => setPolicy1(e.target.value)}
                  className="flex gap-2 mb-4"
                >
                  <Radio value="Reschedule Available">
                    Reschedule Available
                  </Radio>
                  <Radio value="Reschedule Not Available">
                    Reschedule Not Available
                  </Radio>
                </Radio.Group>
                <Radio.Group
                  value={policy2}
                  onChange={(e) => setPolicy2(e.target.value)}
                  className="flex gap-2"
                >
                  <Radio value="Refundable">Refundable</Radio>
                  <Radio value="No refundable">No refundable</Radio>
                </Radio.Group>
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

            {boardingDefault?.length > 0 ? (
              boardingDefault.map((item, index) => (
                <BoardingArrive
                  array={boarding}
                  setArray={setBoarding}
                  data={item}
                  key={item._id}
                  isBoarding={true}
                />
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

            {arrivalDefault?.length > 0 ? (
              arrivalDefault.map((item, index) => (
                <BoardingArrive
                  array={arrival}
                  setArray={setArrival}
                  data={item}
                  key={item._id}
                  isBoarding={false}
                />
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

        {/* Facilities */}
        <div className="w-full mt-6 border border-gray-300 rounded-2xl p-4 md:p-6">
          <div className="flex mb-3 items-center gap-2 md:gap-4">
            <h2 className="font-medium text-lg">Facilities</h2>
            {!isMobile && (
              <Tooltip title="Optional facilities">
                <FaQuestionCircle size={23} />
              </Tooltip>
            )}
          </div>
          <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <div
              onClick={() => setShowCreateFacility(true)}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create facility
            </div>
            {facilitiesDefault?.length > 0 ? (
              <Facilities
                handleFaChange={handleFaChange}
                facilities={facilities}
                setFacilitiesDefault={setFacilitiesDefault}
                facilitiesDefault={facilitiesDefault}
              />
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No facility available.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <label className="text-xl md:text-2xl font-medium">
            Terms & Conditions
          </label>
          <EditorTiny
            handleEditorChange={(e) => {
              setConditions(e);
            }}
            description={conditions}
          />
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="w-full flex items-center justify-center cursor-pointer">
        <CiCircleChevUp onClick={handleUp} size={40} />
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
      {showCreateFacility && (
        <ModelCreateFacility
          facilities={facilities}
          setFacilities={setFacilities}
          setShowCreateFacility={setShowCreateFacility}
          isBus={true}
        />
      )}
    </>
  );
};

export default AdminCreateBus;
