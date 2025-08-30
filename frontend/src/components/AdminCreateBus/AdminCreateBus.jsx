import React, { useEffect, useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Country, State } from "country-state-city";
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
// import { BeatLoader } from "react-spinners";

const AdminCreateBus = () => {
    const dispatch = useDispatch();
    const cities = State.getStatesOfCountry("VN");
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
    const [condition, setCondition] = useState("");
    const [totalSeats, setTotalSeats] = useState("");
    const [poName, setPoName] = useState("");
    const [seat, setSeat] = useState([]);
    const [price, setPrice] = useState(0);
    const [policy1, setPolicy1] = useState("");
    const [policy2, setPolicy2] = useState("");
    const [conditions, setConditions] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    // Functions
    function removePhoto(filename) {
        setPhotos([...photos.filter((photo) => photo !== filename)]);
    }

    const addPhotoByFile = async (ev) => {
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
            toast.error("Error uploading photos");
        }
    };

    const handleFaChange = (id) => {
        const isExist = facilities.find((i) => i === id);
        if (isExist) {
            setFacilities(facilities.filter((i) => i !== id));
        } else {
            setFacilities([...facilities, id]);
        }
    };

    const handleUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

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
            boarding,
            arrival,
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
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="w-full pt-8 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white shadow-sm rounded-lg">
                <h3 className="font-bold text-2xl sm:text-3xl sm:mb-3 text-indigo-600">
                    Create New Bus
                </h3>
                <button
                    onClick={addBus}
                    disabled={loading}
                    className={`flex items-center gap-2 px-4 py-2 sm:px-3 sm:py-3 rounded-xl bg-indigo-600 mb-3 text-white font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50`}
                >
                    {loading ? (
                        // <BeatLoader color="#ffffff" size={10} />
                        <>123</>
                    ) : (
                        <TiPlusOutline size={20} />
                    )}
                    <span>{loading ? "Creating Bus..." : "Add New Bus"}</span>
                </button>
            </div>

            <div className="w-full px-4 sm:px-8 py-6 space-y-6">
                {/* Bus Pictures */}
                <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-700 mb-4">
                        Bus Pictures
                    </h3>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex items-center justify-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition duration-200 cursor-pointer">
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={addPhotoByFile}
                            />
                            <IoCloudUploadOutline size={24} />
                            <span className="ml-2">Upload</span>
                        </label>
                        {photos.map((item, index) => (
                            <div key={index} className="relative h-32 sm:h-40">
                                <img
                                    src={item}
                                    alt="Bus"
                                    className="rounded-xl w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => removePhoto(item)}
                                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket Details */}
                <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-700 mb-4">
                        Ticket Details
                    </h3>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {/* From */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                From <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <IoIosArrowDropright className="text-gray-500 mx-2" size={24} />
                                <select
                                    value={cityFrom}
                                    onChange={(e) => {
                                        setCityFrom(e.target.value);
                                        setBoarding([]);
                                    }}
                                    className="w-full p-2 bg-transparent outline-none text-gray-700"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* To */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                To <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <IoIosArrowDropleft className="text-gray-500 mx-2" size={24} />
                                <select
                                    value={cityTo}
                                    onChange={(e) => {
                                        setCityTo(e.target.value);
                                        setArrival([]);
                                    }}
                                    className="w-full p-2 bg-transparent outline-none text-gray-700"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Departure Time */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Departure Time <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <GoClock className="text-gray-500 mx-2" size={24} />
                                <TimePicker
                                    className="flex-1 bg-transparent border-0 focus:outline-none"
                                    format="HH:mm"
                                    value={departureTime}
                                    onChange={(time) => setDepartureTime(time)}
                                />
                            </div>
                        </div>

                        {/* Arrival Time */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Arrival Time <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <GoClock className="text-gray-500 mx-2" size={24} />
                                <TimePicker
                                    className="flex-1 bg-transparent border-0 focus:outline-none"
                                    format="HH:mm"
                                    value={arrivalTime}
                                    onChange={(time) => setArrivalTime(time)}
                                />
                            </div>
                        </div>

                        {/* Total Seats */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Total Seats <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <MdOutlineBusAlert className="text-gray-500 mx-2" size={24} />
                                <Input
                                    type="number"
                                    placeholder="40"
                                    className="border-0 bg-transparent focus:outline-none"
                                    value={totalSeats}
                                    onChange={(e) =>
                                        setTotalSeats(
                                            e.target.value ? parseInt(e.target.value, 10) : 0
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* PO Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                PO Name <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <CiReceipt className="text-gray-500 mx-2" size={24} />
                                <Input
                                    placeholder="Limousine"
                                    className="border-0 bg-transparent focus:outline-none"
                                    value={poName}
                                    onChange={(e) => setPoName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Seats */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Seat(s) <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg p-2">
                                <PiSeatThin className="text-gray-500 mx-2" size={24} />
                                <Checkbox.Group
                                    value={seat}
                                    onChange={(e) => setSeat(e)}
                                    className="flex gap-4"
                                >
                                    <Checkbox value="1">1-1</Checkbox>
                                    <Checkbox value="2">2-2</Checkbox>
                                </Checkbox.Group>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400">
                                <CiMoneyCheck1 className="text-gray-500 mx-2" size={24} />
                                <Input
                                    type="number"
                                    placeholder="500"
                                    className="border-0 bg-transparent focus:outline-none"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(e.target.value ? parseInt(e.target.value, 10) : 0)
                                    }
                                />
                            </div>
                        </div>

                        {/* Refund & Reschedule Policy */}
                        <div className="flex flex-col gap-2 col-span-full">
                            <label className="text-sm font-medium text-gray-600">
                                Refund & Reschedule Policy
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Radio.Group
                                    value={policy1}
                                    onChange={(e) => setPolicy1(e.target.value)}
                                    className="flex gap-4"
                                >
                                    <Radio value="Reschedule Available">Reschedule Available</Radio>
                                    <Radio value="Reschedule Not Available">Reschedule Not Available</Radio>
                                </Radio.Group>
                                <Radio.Group
                                    value={policy2}
                                    onChange={(e) => setPolicy2(e.target.value)}
                                    className="flex gap-4"
                                >
                                    <Radio value="Refundable">Refundable</Radio>
                                    <Radio value="No refundable">No refundable</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boarding Point */}
                <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="font-semibold text-lg sm:text-xl text-gray-700">
                            Select Boarding Point
                        </h3>
                        {!isMobile && (
                            <Tooltip title="Select from address first">
                                <FaQuestionCircle size={20} className="text-gray-500" />
                            </Tooltip>
                        )}
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <div
                            onClick={() =>
                                cityFrom
                                    ? setModalBoardingPoint(true)
                                    : toast.error("Please select a city from first")
                            }
                            className="cursor-pointer h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition duration-200"
                        >
                            <IoCloudUploadOutline size={24} />
                            <span className="ml-2">Create Boarding Point</span>
                        </div>
                        {boardingDefault?.length > 0 ? (
                            boardingDefault.map((item) => (
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

                {/* Arrival Point */}
                <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="font-semibold text-lg sm:text-xl text-gray-700">
                            Select Arrival Point
                        </h3>
                        {!isMobile && (
                            <Tooltip title="Select to address first">
                                <FaQuestionCircle size={20} className="text-gray-500" />
                            </Tooltip>
                        )}
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <div
                            onClick={() =>
                                cityTo
                                    ? setModalArrivalPoint(true)
                                    : toast.error("Please select a city to first")
                            }
                            className="cursor-pointer h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition duration-200"
                        >
                            <IoCloudUploadOutline size={24} />
                            <span className="ml-2">Create Arrival Point</span>
                        </div>
                        {arrivalDefault?.length > 0 ? (
                            arrivalDefault.map((item) => (
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
                    </div>
                </div>

                {/* Facilities */}
                <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="font-semibold text-lg sm:text-xl text-gray-700">
                            Facilities
                        </h3>
                        {!isMobile && (
                            <Tooltip title="Optional facilities">
                                <FaQuestionCircle size={20} className="text-gray-500" />
                            </Tooltip>
                        )}
                    </div>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                        <div
                            onClick={() => setShowCreateFacility(true)}
                            className="cursor-pointer h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition duration-200"
                        >
                            <IoCloudUploadOutline size={24} />
                            <span className="ml-2">Create Facility</span>
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
                                No facilities available.
                            </p>
                        )}
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-200">
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-700 mb-4">
                        Terms & Conditions
                    </h3>
                    <EditorTiny
                        handleEditorChange={(e) => setCondition(e)}
                        description={condition}
                    />
                </div>
            </div>

            {/* Scroll to Top */}
            <div className="w-full flex justify-center py-4">
                <button
                    onClick={handleUp}
                    className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                >
                    <CiCircleChevUp size={40} />
                </button>
            </div>

            {/* Modals */}
            {modalBoardingPoint && (
                <ModalBoardingArrive
                    isBoarding={true}
                    setShowModel={setModalBoardingPoint}
                    city={cityFrom}
                />
            )}
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
        </div>
    );
};

export default AdminCreateBus;