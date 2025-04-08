import { Form, TimePicker, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";
import {
  createHotelApi,
  createPolicyApi,
  getAllRoomApi,
  getAllServicesApi,
  getPolicyApi,
  uploadByFilesApi,
  uploadByLinkApi,
} from "../../../Axios/client/api";
import iconMap from "../../data/iconMap"; // Import the iconMap from the external file
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { RxCross1 } from "react-icons/rx";
import ModelCreateService from "./ModelCreateService";
import { useDispatch } from "react-redux";
import { getAllHotelsAction } from "../../redux/actions/HotelAction";
import { getAllRoomsAction } from "../../redux/actions/RoomAction";
import { useNavigate } from "react-router";
import { FaQuestionCircle } from "react-icons/fa";

const AdminCreateHotel = () => {
  const dispatch = useDispatch()
  // popup model
  const [showModel, setShowModel] = useState(false);

  // default values
  const typeDefault = ["Hotel", "Villa", "House", "Flat"];
  const cities = State.getStatesOfCountry("VN");
  const [roomTypeDefault,setRoomTypeDefault] = useState([
    "King Room",
    "Deluxe Room",
    "One-Bedroom Apartment",
    "Two-Bedroom Apartment",
  ])
  const [inputRoomType,setInputRoomType] = useState("")
  const [servicesDefault, setServicesDefault] = useState([]);

  // create hotel
  const [name, setName] = useState("");
  const [type, setType] = useState("Hotel");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [cheapestPrice, setCheapestPrice] = useState();
  const [roomType, setRoomType] = useState([]);
  const [checkIn, setCheckIn] = useState(dayjs("14:00", "HH:mm")); // Default value for check-in
  const [checkOut, setCheckOut] = useState(dayjs("12:00", "HH:mm"));
  const [linkPhoto, setLinkPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);

  // handle function
  const addPhotoByFile = async (ev) => {
    // ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    console.log("ok");

    const res = await uploadByFilesApi(data);
    console.log(res);

    if (res.success) {
      const newImg = res.data.map((item) => item.url);
      setPhotos([...photos, ...newImg]);
    } else {
      console.log(res);

      toast.error("Error");
    }
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    // setDisableButton(true);
    if (!linkPhoto) {
      toast.error("Please enter a valid image URL");
      // setDisableButton(false)
      return;
    } else {
      const res = await uploadByLinkApi({ imageUrl: linkPhoto });
      setLinkPhoto("");
      if (res.code == 200) {
        // setPhotosByLink([...photosByLink,res.data.url])
        setPhotos([...photos, res.data.url]);
        setLinkPhoto("");
        // setDisableButton(false)
        toast.success("ok");
      } else {
        console.log(res);

        toast.error("Link error");
        // setDisableButton(false)
      }
    }
  };
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== filename)]);
  }
  const handleEditorChange = (content) => {
    console.log(content);
    
    setDescription(content);
  };

  

  const handleServiceChange = (serviceId) => {
    setServices((services) => {
      // If the service is already selected, remove it; otherwise, add it
      if (services.includes(serviceId)) {
        return services.filter((id) => id !== serviceId); // Remove the id
      } else {
        return [...services, serviceId]; // Add the id
      }
    });
  };

  const handleRoomTypeChange = (name) => {
    const isExist = roomType.find((i) => i === name);
    if (isExist) {
      const tmp = roomType.filter((i) => i != name);
      setRoomType(tmp);
    } else {
      return setRoomType([...roomType, name]);
    }
  };
  const navigate = useNavigate()

  // policy
  const [typePolicyDefault,setTypePolicyDefault] = useState([
    'House rules',
    "Safety & property",
    "Cancellation policy"
  ])
  const [inputPolicy,setInputPolicy] = useState()
  const [typePolicy,setTypePolicy] = useState('House rules');
  const [policy,setPolicy] = useState([])
  const [policyChecked,setPolicyChecked] = useState([])
  const handlePolicyChange = (id) => {
    const isExist = policyChecked.find((i) => i === id);
    if (isExist) {
      const tmp = policyChecked.filter((i) => i != id);
      setPolicyChecked(tmp);
    } else {
      return setPolicyChecked([...policyChecked, id]);
    }
  };
  const getPolicy = async()=>{
    console.log(typePolicy);
    
    if(typePolicy){
      const tmp = await getPolicyApi({type:typePolicy})
      // console.log(tmp);
      
      if(tmp.success){
        
        setPolicy(tmp.data)
      }
    }
  }
  useEffect(()=>{
     
      getPolicy()
  },[typePolicy])

  const handleAddPolicy =async ()=>{
    
    if(typePolicy){
      if(inputPolicy){
        const tmp = await createPolicyApi({name:inputPolicy,type:typePolicy})
         if(tmp.success){
          setPolicy([...policy,tmp.data])
          setInputPolicy("")
        }else{
          return toast.error(tmp.message)
        }
       
      }
    }
    else{
      return toast.error("Please choose type policy first")
    }
  }
  
  

  useEffect(() => {
    const alo = async () => {
      const ad = await getAllServicesApi();
      setServicesDefault(ad.data);
    };
    alo();
  }, [showModel]);

  const handleCreateHotel = async(e) => {
    e.preventDefault();
    // console.log(123);
    if (!name || name.trim().length===0 ) {
      return toast.error("Name cannot be empty");
    }

    if (!type) {
      return toast.error("Type accommodation cannot be empty");
    }
    if (!city) {
      return toast.error("Please choose a city for your home.");
    }
    if (!address || address.trim().length===0 ) {
      return toast.error("Address cannot be empty");
    }

    if (!roomType.length > 0) {
      return toast.error("At least one room type is required");
    }

    if (!cheapestPrice) {
     
      return toast.error("please enter price"); // here
    }
    else{
      if(cheapestPrice<0) return toast.error("Invalid price")
    }
    if (!services.length > 0) {
      return toast.error("Please select at least one service offered at this accommodation");
    }
    if (!checkIn) {
      return toast.error("Check in time cannot be empty");
    }
    if (!checkOut) {
      return toast.error("Check out time cannot be empty");
    }
    
    // return 1

    let dataHotel = {
      name,
      type,
      city,
      address,
      // photos,
      // description,
      // services,
      // numberOfrooms,
      roomType,
      // numberOfFloor,
      cheapestPrice,
      checkIn,
      checkOut,
      policy:policyChecked
    };
    if (photos.length > 0) {
      dataHotel.photos = photos;
    }

    if (description) {
      dataHotel.description = description;
    }
    if (services.length > 0) {
      dataHotel.services = services;
    }
    // console.log(dataHotel);
    const res = await createHotelApi(dataHotel)
    // console.log(services);
    
    if(res.success){
      navigate("/dashboard-view-homes")
      toast.success("Home has been successfully created.")
      setName("")
      setType("")
      setCity("")
      setAddress("")
      setCheapestPrice()
      setRoomType([])
      setCheckIn(dayjs("14:00","HH:mm"))
      setCheckOut(dayjs('14:00',"HH:mm"))
      setLinkPhoto("")
      setPhotos([])
      setDescription("")
      setServices([])
      dispatch(getAllRoomsAction()  )
      dispatch(getAllHotelsAction())
      
    }
    else{
      toast.error("Unable to create home. Please try again later.");
    }
  };

  

  return (
    <>
      <div className="w-full py-6 px-6">
        <h2 className="font-[600] leading-[40px] text-gray-600 text-[36px]">
          Create new home
        </h2>
      </div>
      <div className="w-full px-6">
        <form className="w-full">
          <div className="mb-4 w-full flex flex-col ">
            <p htmlFor="" className="font-[400] text-[25px]">
              Name
            </p>
            <p className="text-[16px] font-[400] text-gray-400">
              Name of accommodation, should be short and catchy as in
              advertisement
            </p>
            <input
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4 w-full flex items-center justify-between">
            <div className="w-[48%] flex flex-col ">
              <p htmlFor="" className="font-[400] text-[25px]">
                Type of Accommodation
              </p>
              <p className="text-[16px] font-[400] text-gray-400">
                Choose the type of accommodation, such as hotel, villa, guest
                house, ...
              </p>
              <select
                defaultValue={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
              >
                {typeDefault.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className=" w-[50%] flex flex-col ">
              <p htmlFor="" className="font-[400] text-[25px]">
                City
              </p>
              <p className="text-[16px] font-[400] text-gray-400">
                Choose the city of your accomodation
              </p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          

<div className=" w-full flex items-center justify-between">
          <div className=" w-[48%] flex flex-col ">
              <p htmlFor="" className="font-[400] text-[25px]">
                Cheapest price
              </p>
              <p className="text-[16px] font-[400] text-gray-400">
              Specific address of the building
            </p>
              <input
                className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
                type="number"
                name=""
                id=""
                value={cheapestPrice}
                onChange={(e) => setCheapestPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className=" w-[50%] flex flex-col ">
            <p htmlFor="" className="font-[400] text-[25px]">
              Address
            </p>
            <p className="text-[16px] font-[400] text-gray-400">
              Specific address of the building
            </p>
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-3xl"
            />
          </div>

            
          </div>

          <div className="mb-4 w-full flex flex-col ">
              <div className="flex mb-2 items-center justify-between">
              <p htmlFor="" className="font-[400] text-[25px]">
                Rooms Type
              </p>  
                <div className="flex items-center gap-2">
                  <input value={inputRoomType} onChange={e=>setInputRoomType(e.target.value)} type="text" className="px-4 py-2 border border-gray-400 rounded-3xl" placeholder="Enter type's name " />
                  <div
                  onClick={() => {setRoomTypeDefault([...roomTypeDefault,inputRoomType]); setInputRoomType("")}}
                  className="cursor-pointer px-4 py-2 flex items-center   bg-gray-400 rounded-2xl text-white justify-center "
                >
                  Add type
                </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
              <div className="flex-1 px-4 py-2 border border-gray-400 rounded-3xl">
                <div className="flex  items-center gap-4 flex-wrap ">
                  {roomTypeDefault.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="flex items-center gap-2">
                          <input
                            checked={roomType.includes(item)} // Check if the room type is selected
                            onChange={() => handleRoomTypeChange(item)}
                            type="checkbox"
                          />
                          {item}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              </div>
            </div>

          <div className="mb-4 w-full flex flex-col ">
            <p htmlFor="" className="font-[400] text-[25px]">
              Photos
            </p>
            <p className="text-[16px] font-[400] text-gray-400">Specific URL</p>
            <div className="flex justify-between">
              <input
                type="text"
                className=" w-[90%]  px-4 py-2 border border-gray-400 rounded-3xl"
                placeholder="Add using a link"
                value={linkPhoto}
                onChange={(e) => setLinkPhoto(e.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="cursor-pointer flex items-center w-[9%]  bg-gray-400 rounded-2xl text-white justify-center "
              >
                Add photo
              </button>
            </div>
            <div className="grid gap-2 mt-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              <label className="border cursor-pointer bg-transparent rounded-2xl p-8 flex items-center  text-2xl text-gray-600">
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
                  <>
                    <div key={index} className="h-32 relative flex ">
                      <img
                        src={item}
                        className="rounded-2xl w-full object-cover"
                      />
                      <span
                        onClick={(ev) => removePhoto(ev, item)}
                        className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition duration-300"
                      >
                        X
                      </span>
                    </div>
                  </>
                ))}
            </div>
          </div>

          <div className="mb-4 w-full flex flex-col ">
            <p htmlFor="" className="font-[400] text-[25px]">
              Description
            </p>
            <Editor
              apiKey="izl72j5zg9fjcr0551e6p3vrd6gpctfwcer7okoq9iqtsxk4" // Optional: API key if you want to use TinyMCE Cloud
              value={description}
              onEditorChange={handleEditorChange}
              init={{
                 valid_elements: '*[*]',
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
          </div>

          <div className="mb-4 w-full flex flex-col ">
            <p htmlFor="" className="font-[400] text-[25px]">
              Services
            </p>
            <p className="text-[16px] font-[400] text-gray-400">
              Select the services available at your accommodation to offer your
              guests a great experience.
            </p>
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div
                onClick={() => setShowModel(true)}
                className="cursor-pointer h-24 border p-4 flex rounded-2xl gap-2 items-center"
              >
                <IoCloudUploadOutline />
                Create service
              </div>

              {servicesDefault?.length > 0 && (
                <>
                  {servicesDefault.map((service, index) => (
                    <label className="cursor-pointer h-24 border p-4 flex rounded-2xl gap-2 items-center">
                      <input
                        onChange={() => handleServiceChange(service._id)}
                        type="checkbox"
                        className="mr-2"
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

          <div className="mb-4 w-full flex flex-col ">
            <div className="flex items-center justify-between">
            <p htmlFor="" className="font-[400] text-[25px]">
              Policies
            </p>
            <div className="flex mb-3 items-center gap-4">
                <Tooltip title="Choose the type of policy before add ">
                  <FaQuestionCircle size={23} />
                </Tooltip>
               <div className="flex items-center gap-2"> <input value={inputPolicy} onChange={e=>setInputPolicy(e.target.value)}  type="text" className="px-4 py-2 border border-gray-400 rounded-3xl" placeholder="Enter policy " />
                  <div
                  onClick={handleAddPolicy}
                  className="cursor-pointer px-4 py-2 flex items-center   bg-gray-400 rounded-2xl text-white justify-center "
                >
                  Add new
                </div>
                </div>
              </div>
            </div>
              <div>
                <select value={typePolicy} onChange={e=>setTypePolicy(e.target.value)}  className="w-[30%] px-4 py-2 border border-gray-400 rounded-3xl" name="" id="">
                  <option disabled  value="" className="text-gray-200">Select type of policy</option>
                  {typePolicyDefault?.map((i,ind)=>(
                    <>
                      <option key={ind} value={i}>{i}</option>
                    </>
                  ))}
                </select>

              </div>
              <div className="mt-2 flex gap-4 items-center flex-wrap">
                {
                  policy?.map(i=>(
                    <>
                       <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={policyChecked.includes(i._id)}
                      onChange={() => handlePolicyChange(i._id)}
                    />
                    <span className="ml-2">{i.name}</span>
                  </label>
                    </>
                  ))
                }
              </div>
          </div>

          

          

         

          <div className="mb-4 w-full flex flex-col ">
            <p htmlFor="" className="font-[400] text-[25px]">
              Check in&out times
            </p>
            <p className="text-[16px] font-[400] text-gray-400">
              Add check in and out times, remember to have some time window for
              clearing the room between guests
            </p>
            <div className="grid grid-cols-2 gap-2">
              <TimePicker
                onChange={(time) => setCheckIn(time)}
                value={checkIn}
                format="HH:mm"
                placeholder="14:00"
                className="rounded-2xl w-full"
              />
              <TimePicker
                onChange={(time) => setCheckOut(time)}
                value={checkOut}
                format="HH:mm"
                placeholder="12:00"
                className="rounded-2xl w-full"
              />
            </div>
          </div>

          <button
            onClick={handleCreateHotel}
            className="w-full cursor-pointer flex items-center justify-center bg-gray-300 rounded-2xl my-4 mt-6 py-2"
          >
            Create Hotel
          </button>
        </form>
      </div>

      {showModel && (
        <>
          <ModelCreateService setShowModel={setShowModel}/>
          
        </>
      )}


      {/* <Map/> */}
    </>
  );
};

export default AdminCreateHotel;
