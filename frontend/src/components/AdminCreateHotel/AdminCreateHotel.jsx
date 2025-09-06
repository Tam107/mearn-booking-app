import { Form, TimePicker, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { FaQuestionCircle } from "react-icons/fa";
import ModelCreateService from "./ModelCreateService";
import ModelCreatePolicy from "../ModelCreatePolicy/ModelCreatePolicy";
import Services from "../Services/Services";
import Policy from "../Policy/Policy";
import EditorTiny from "../EditorTiny/EditorTiny";
import {
  createHotelApi,
  getAllServicesApi,
  getPolicyApi,
  uploadByFilesApi,
  uploadByLinkApi,
} from "../../../Axios/client/api";
import { getAllHotelsAction } from "../../redux/actions/HotelAction";
import { getAllRoomsAction } from "../../redux/actions/RoomAction";
import { cities } from "../../Common/common";

const AdminCreateHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // popup model
  const [showModel, setShowModel] = useState(false);
  const [showModelPolicy, setShowModelPolicy] = useState(false);

  // default values
  const typeDefault = ["Hotel", "Villa", "House", "Flat"];
  const [roomTypeDefault, setRoomTypeDefault] = useState([
    "King Room",
    "Deluxe Room",
    "One-Bedroom Apartment",
    "Two-Bedroom Apartment",
  ]);
  const [inputRoomType, setInputRoomType] = useState("");
  const [servicesDefault, setServicesDefault] = useState([]);

  // create hotel
  const [name, setName] = useState("");
  const [type, setType] = useState("Hotel");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState();
  const [roomType, setRoomType] = useState([]);
  const [checkIn, setCheckIn] = useState(dayjs("14:00", "HH:mm"));
  const [checkOut, setCheckOut] = useState(dayjs("12:00", "HH:mm"));
  const [linkPhoto, setLinkPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);

  // policy
  const [typePolicyDefault, setTypePolicyDefault] = useState([
    "House rules",
    "Safety & property",
    "Cancellation policy",
  ]);
  const [typePolicy, setTypePolicy] = useState("House rules");
  const [policy, setPolicy] = useState([]);
  const [policyChecked, setPolicyChecked] = useState([]);

  // fetch services
  useEffect(() => {
    const fetchServices = async () => {
      const res = await getAllServicesApi();
      setServicesDefault(res.data || []);
    };
    fetchServices();
  }, [showModel]);

  // fetch policies
  const getPolicy = async () => {
    if (typePolicy) {
      const tmp = await getPolicyApi({ type: typePolicy });
      if (tmp.success) setPolicy(tmp.data);
    }
  };
  useEffect(() => {
    getPolicy();
  }, [typePolicy, showModelPolicy]);

  // handlers
  const addPhotoByFile = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) data.append("photos", files[i]);

    const res = await uploadByFilesApi(data);
    if (res.success)
      setPhotos([...photos, ...res.data.map((item) => item.url)]);
    else toast.error("Error uploading files");
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    if (!linkPhoto) return toast.error("Please enter a valid image URL");
    const res = await uploadByLinkApi({ imageUrl: linkPhoto });
    if (res.code === 200) {
      setPhotos([...photos, res.data.url]);
      setLinkPhoto("");
      toast.success("Photo added");
    } else toast.error("Link error");
  };

  const removePhoto = (ev, filename) => {
    ev.preventDefault();
    setPhotos(photos.filter((photo) => photo !== filename));
  };

  const handleEditorChange = (content) => setDescription(content);

  const handleServiceChange = (serviceId) => {
    setServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRoomTypeChange = (name) => {
    setRoomType((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handlePolicyChange = (id) => {
    setPolicyChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreateHotel = async (e) => {
    e.preventDefault();
    if (!name?.trim()) return toast.error("Name cannot be empty");
    if (!type) return toast.error("Type accommodation cannot be empty");
    if (!city) return toast.error("Please choose a city");
    if (!cheapestPrice) return toast.error("Please enter price");
    if (cheapestPrice < 0) return toast.error("Invalid price");
    if (!address?.trim()) return toast.error("Address cannot be empty");
    if (!roomType.length)
      return toast.error("At least one room type is required");
    if (!services.length)
      return toast.error("Please select at least one service");
    if (!checkIn) return toast.error("Check in time cannot be empty");
    if (!checkOut) return toast.error("Check out time cannot be empty");

    const dataHotel = {
      name,
      type,
      city,
      address,
      roomType,
      cheapestPrice,
      checkIn,
      checkOut,
      policy: policyChecked,
      ...(photos.length && { photos }),
      ...(description && { description }),
      ...(services.length && { services }),
    };

    const res = await createHotelApi(dataHotel);
    if (res.success) {
      toast.success("Home has been successfully created.");
      navigate("/dashboard-view-homes");
      setName("");
      setType("Hotel");
      setCity("");
      setAddress("");
      setCheapestPrice();
      setRoomType([]);
      setCheckIn(dayjs("14:00", "HH:mm"));
      setCheckOut(dayjs("12:00", "HH:mm"));
      setLinkPhoto("");
      setPhotos([]);
      setDescription("");
      setServices([]);
      dispatch(getAllRoomsAction());
      dispatch(getAllHotelsAction());
    } else toast.error("Unable to create home. Please try again later.");
  };

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <h2 className="font-semibold text-gray-600 text-3xl md:text-4xl mb-6">
        Create new home
      </h2>
      <form className="w-full space-y-6">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-xl md:text-2xl font-medium">Name</label>
          <p className="text-sm text-gray-400 mb-2">Short and catchy name</p>
          <input
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Type & City */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-xl md:text-2xl font-medium">
              Type of Accommodation
            </label>
            <p className="text-sm text-gray-400 mb-2">Hotel, Villa, House...</p>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
            >
              {typeDefault.map((i, idx) => (
                <option key={idx} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-xl md:text-2xl font-medium">City</label>
            <p className="text-sm text-gray-400 mb-2">City of accommodation</p>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
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

        {/* Price & Address */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-xl md:text-2xl font-medium">
              Cheapest price
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
              type="number"
              value={cheapestPrice}
              onChange={(e) => setCheapestPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-xl md:text-2xl font-medium">Address</label>
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
            />
          </div>
        </div>

        {/* Room Types */}
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mb-2">
            <label className="text-xl md:text-2xl font-medium">
              Rooms Type
            </label>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                value={inputRoomType}
                onChange={(e) => setInputRoomType(e.target.value)}
                type="text"
                className="flex-1 px-4 py-2 border border-gray-400 rounded-3xl"
                placeholder="Enter type name"
              />
              <button
                type="button"
                onClick={() => {
                  if (inputRoomType.trim()) {
                    setRoomTypeDefault([...roomTypeDefault, inputRoomType]);
                    setInputRoomType("");
                  }
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-2xl"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {roomTypeDefault.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={roomType.includes(item)}
                  onChange={() => handleRoomTypeChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="flex flex-col">
          <label className="text-xl md:text-2xl font-medium">Photos</label>
          <p className="text-sm text-gray-400 mb-2">
            Add images via link or upload
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Add using a link"
              className="flex-1 px-4 py-2 border border-gray-400 rounded-3xl"
              value={linkPhoto}
              onChange={(e) => setLinkPhoto(e.target.value)}
            />
            <button
              type="button"
              onClick={addPhotoByLink}
              className="px-4 py-2 bg-gray-400 text-white rounded-2xl"
            >
              Add photo
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
            {photos.map((item, idx) => (
              <div key={idx} className="relative h-32">
                <img
                  src={item}
                  alt="hotel"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <span
                  onClick={(ev) => removePhoto(ev, item)}
                  className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-700"
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-xl md:text-2xl font-medium">Description</label>
          <EditorTiny
            handleEditorChange={handleEditorChange}
            description={description}
          />
        </div>

        {/* Services */}
        <div className="flex flex-col">
          <label className="text-xl md:text-2xl font-medium">Services</label>
          <p className="text-sm text-gray-400 mb-2">
            Select services to offer guests
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <div
              onClick={() => setShowModel(true)}
              className="cursor-pointer h-20 border p-4 flex items-center rounded-2xl gap-2"
            >
              <IoCloudUploadOutline /> Create service
            </div>
            {servicesDefault.length > 0 && (
              <Services
                handleServiceChange={handleServiceChange}
                setServicesDefault={setServicesDefault}
                servicesDefault={servicesDefault}
                services={services}
              />
            )}
          </div>
        </div>

        {/* Policies */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xl md:text-2xl font-medium">Policies</label>
            <div className="flex items-center gap-2">
              <Tooltip title="Choose the type of policy before add">
                <FaQuestionCircle size={23} />
              </Tooltip>
              <select
                value={typePolicy}
                onChange={(e) => setTypePolicy(e.target.value)}
                className="px-4 py-2 border border-gray-400 rounded-3xl"
              >
                <option disabled value="">
                  Select type
                </option>
                {typePolicyDefault.map((i, idx) => (
                  <option key={idx} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <div
              onClick={() => setShowModelPolicy(true)}
              className="cursor-pointer h-20 border p-4 flex items-center rounded-2xl gap-2"
            >
              <IoCloudUploadOutline /> Create policy
            </div>
            {policy.length > 0 && (
              <Policy
                typePolicyDefault={typePolicyDefault}
                handlePolicyChange={handlePolicyChange}
                policy={policy}
                setPolicy={setPolicy}
                policyChecked={policyChecked}
              />
            )}
          </div>
        </div>

        {/* Check in/out */}
        <div className="flex flex-col">
          <label className="text-xl md:text-2xl font-medium">
            Check in & out times
          </label>
          <p className="text-sm text-gray-400 mb-2">Set check in/out times</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <TimePicker
              onChange={(time) => setCheckIn(time)}
              value={checkIn}
              format="HH:mm"
              placeholder="14:00"
              className="w-full rounded-2xl"
            />
            <TimePicker
              onChange={(time) => setCheckOut(time)}
              value={checkOut}
              format="HH:mm"
              placeholder="12:00"
              className="w-full rounded-2xl"
            />
          </div>
        </div>

        <button
          onClick={handleCreateHotel}
          className="w-full py-2 bg-gray-300 rounded-2xl flex items-center justify-center mt-4"
        >
          Create Home
        </button>
      </form>

      {showModel && (
        <ModelCreateService
          services={services}
          setServices={setServices}
          setShowModel={setShowModel}
        />
      )}
      {showModelPolicy && (
        <ModelCreatePolicy
          typePolicyDefault={typePolicyDefault}
          setTypePolicy={setTypePolicy}
          typePolicy={typePolicy}
          policyChecked={policyChecked}
          setPolicyChecked={setPolicyChecked}
          setShowModel={setShowModelPolicy}
        />
      )}
    </div>
  );
};

export default AdminCreateHotel;
