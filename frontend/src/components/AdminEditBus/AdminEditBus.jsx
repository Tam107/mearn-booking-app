import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TiPlusOutline } from "react-icons/ti";
import {
    busAdminApi,
  getAllFacilitiesApi,
  uploadByFilesApi,
} from "../../../Axios/client/api";
import { State } from "country-state-city";
import { GoClock } from "react-icons/go";
import { Checkbox, Input, Radio, TimePicker, Tooltip } from "antd";
import { MdOutlineBusAlert } from "react-icons/md";
import { CiCircleChevUp, CiMoneyCheck1, CiReceipt } from "react-icons/ci";
import { PiSeatThin } from "react-icons/pi";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import dayjs from "dayjs"; // nếu bạn đang dùng dayjs
import { FaQuestionCircle } from "react-icons/fa";
import BoardingArrive from "../AdminCreateBus/BoardingArrive";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import Facilities from "../Facilities/Facilities";
import EditorTiny from "../EditorTiny/EditorTiny";
import ModelCreateFacility from "../ModelCreateFacility/ModelCreateFacility";
import ModalBoardingArrive from "../AdminCreateBus/ModalBoardingArrive";
import toast from "react-hot-toast";
import { updateBusAction } from "../../redux/actions/BusAction";
import { useNavigate } from "react-router";
import { cities } from "../../Common/common";

const AdminEditBus = ({ data, setData }) => {
  const [facilitiesDefault, setFacilitiesDefault] = useState([]);
  const [modalBoardingPoint, setModalBoardingPoint] = useState(false);
  const [modalArrivalPoint, setModalArrivalPoint] = useState(false);

  const [boardingDefault, setBoardingDefault] = useState([]);
  const [arrivalDefault, setArrivalDefault] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const stateBus = useSelector((state) => state.BusReducer);
  const [showCreateFacility, setShowCreateFacility] = useState(false);
const dispatch = useDispatch()
const navigate = useNavigate() 
  const [loading, setLoading] = useState(false); // Loading state for the button
  const updateBus = async () => {
    setLoading(true);
    try {
        const dataResponse = await busAdminApi("update-bus/"+data._id, "patch", data);
  
        if (dataResponse.success) {
          toast.success("Update bus successfully");
          dispatch(updateBusAction(dataResponse));
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
  const addPhotoByFile = async (ev) => {
    // ev.preventDefault();
    const files = ev.target.files;
    const dataForm = new FormData();
    for (let i = 0; i < files.length; i++) {
      dataForm.append("photos", files[i]);
    }
    const res = await uploadByFilesApi(dataForm);

    if (res.success) {
      const newImg = res.data.map((item) => item.url);
      setData({ ...data, photos: [...data.photos, ...newImg] });
    } else {
      toast.error("Error");
    }
  };
  // useEffect
  useEffect(() => {
    const getDefaultFaicily = async () => {
      const data = await getAllFacilitiesApi();
      setFacilitiesDefault(
        data.data ? data.data.filter((item) => item?.isBus === true) : []
      );
    };
    getDefaultFaicily();
  }, [showCreateFacility]);
  useEffect(() => {
    if (stateBus?.boardingPointsAdmin?.length > 0 && data?.cityFrom) {
      setBoardingDefault(
        stateBus?.boardingPointsAdmin.filter(
          (item) => item.city === data?.cityFrom
        )
      );
    }
  }, [stateBus?.boardingPointsAdmin, data?.cityFrom]);
  useEffect(() => {
    if (stateBus?.arrivalPointsAdmin?.length > 0 && data?.cityTo) {
      setArrivalDefault(
        stateBus?.arrivalPointsAdmin.filter(
          (item) => item.city === data?.cityTo
        )
      );
    }
  }, [stateBus?.arrivalPointsAdmin, data?.cityTo]);
  function removePhoto(filename) {
    // ev.preventDefault();
    let tmpPhotos = data?.photos.filter((photo) => photo !== filename);
    setData({ ...data, photos: tmpPhotos });
  }
  function changeCityFrom(e) {
    setData({ ...data, cityFrom: e.target.value, boarding: [] });
  }
  function changeCityTo(e) {
    setData({ ...data, cityTo: e.target.value, arrival: [] });
  }
  function changeDepartTureTime(time) {
    setData({ ...data, departureTime: time });
  }
  function changeArrivalTime(time) {
    setData({ ...data, arrivalTime: time });
  }
  function changePoName(e) {
    setData({ ...data, poName: e.target.value });
  }
  function changeTotalSeat(e) {
    setData({ ...data, totalSeats: e.target.value });
  }
  function changeSeats(e) {
    setData({ ...data, seat: e });
  }
  function changePrice(e) {
    setData({ ...data, price: parseFloat(e.target.value) });
  }
  function changePolicy1(e) {
    let tmp = JSON.parse(JSON.stringify(data?.policy));
    tmp[0] = e.target.value;
    setData({ ...data, policy: tmp });
  }
  function changePolicy2(e) {
    let tmp = JSON.parse(JSON.stringify(data?.policy));
    tmp[1] = e.target.value;
    setData({ ...data, policy: tmp });
  }
  function createBoard() {
    if(data?.cityFrom){
        setModalBoardingPoint(true)
    }
    else{
        toast.error("Please select a city from first");
    }
  }
  function createArrival() {
    if(data?.cityTo){
        setModalArrivalPoint(true)
    }
    else{
        toast.error("Please select a city to first")
    }
  }
  function changeBoarding(item) {
    setData({ ...data, boarding: item });
  }
  function changeArrival(item) {
    setData({ ...data, arrival: item });
  }
  const handleFaChange = (id) => {
    const isExist = data.facilities.find((i) => i === id);
    if (isExist) {
      const tmp = data.facilities.filter((i) => i != id);
      setData({ ...data, facilities: tmp });
    } else {
      return setData({ ...data, facilities: [...data.facilities, id] });
    }
  };
  const changeFal = (data) => {
    setData({ ...data, facilities: data });
  };
  const handleUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // This enables the smooth scrolling effect
    });
  };

  return (
    <>
      {/* Header */}
      <div className="w-full pt-6 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-[600] text-gray-600 text-[28px] md:text-[36px] leading-[36px] md:leading-[40px] cursor-pointer">
          Update bus
        </h2>
        <div
          onClick={updateBus}
          className="cursor-pointer transition duration-200 bg-[#98A1AE] rounded-3xl hover:bg-[#c4c7cd] px-4 py-2 flex items-center gap-2 md:gap-4"
        >
          {loading ? (
            <div className="loader"></div> // Custom loading spinner or you can use a library spinner
          ) : (
            <TiPlusOutline color="white" size={20} />
          )}

          <p className="text-white text-md">
            {loading ? "Updating Bus..." : "Update Bus"}
          </p>
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

            {data?.photos?.length > 0 &&
              data?.photos?.map((item, index) => (
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

        {/* Bus detail */}
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
                  value={data?.cityFrom}
                  onChange={changeCityFrom}
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
                  value={data?.cityTo}
                  onChange={changeCityTo}
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
                  value={
                    data?.departureTime ? dayjs(data?.departureTime) : null
                  }
                  onChange={changeDepartTureTime}
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
                  value={data?.arrivalTime ? dayjs(data?.arrivalTime) : null}
                  onChange={changeArrivalTime}
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
                  value={data?.totalSeats}
                  onChange={changeTotalSeat}
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
                  value={data?.poName}
                  onChange={changePoName}
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
                  value={data?.seat}
                  onChange={changeSeats}
                >
                  <Checkbox value={1}>1-1</Checkbox>
                  <Checkbox value={2}>2-2</Checkbox>
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
                  value={data?.price}
                  onChange={changePrice}
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
                  value={data?.policy?.[0]}
                  onChange={changePolicy1}
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
                  value={data?.policy?.[1]}
                  onChange={changePolicy2}
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
              onClick={createBoard}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create boarding point
            </div>

            {boardingDefault?.length > 0 ? (
              boardingDefault.map((item, index) => (
                <BoardingArrive
                  array={data?.boarding}
                  setArray={changeBoarding}
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
              onClick={createArrival}
              className="cursor-pointer h-20 border border-gray-300 border-dashed p-4 flex rounded-2xl gap-2 items-center justify-center"
            >
              <IoCloudUploadOutline />
              Create arrival point
            </div>

            {arrivalDefault?.length > 0 ? (
              arrivalDefault.map((item, index) => (
                <BoardingArrive
                  array={data?.arrival}
                  setArray={changeArrival}
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
                facilities={data?.facilities}
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
              setData({ ...data, conditions: e });
            }}
            description={data?.conditions}
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
          city={data?.cityFrom}
        />
      )}

      {/* Modals */}
      {modalArrivalPoint && (
        <ModalBoardingArrive
          isBoarding={false}
          setShowModel={setModalArrivalPoint}
          city={data?.cityTo}
        />
      )}
      {showCreateFacility && (
        <ModelCreateFacility
          facilities={data?.facilities}
          setFacilities={changeFal}
          setShowCreateFacility={setShowCreateFacility}
          isBus={true}
        />
      )}
    </>
  );
};

export default AdminEditBus;
