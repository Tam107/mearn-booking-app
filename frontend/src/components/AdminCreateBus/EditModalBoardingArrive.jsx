import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {updateBoardingPointAdminAction, updateArrivalPointAdminAction} from "../../redux/actions/BusAction";

const EditModalBoardingArrive = ({ isBoarding, setShowModel, data,city }) => {  
  const dispatch = useDispatch();
  const [name, setName] = useState(data.name);
  const [address, setAddress] = useState(data.address);
  const handleClick = async (city) => {    
    if (!name) return toast.error("Name must not be empty");
    if (city.length == 0) return toast.error(`City must not be empty ${city}`);
    if (!address) return toast.error("Address must not be empty");
    let payload = {
      city,
      name,
      address,
      isBoarding,
      _id:data._id
    };
    dispatch( isBoarding ? updateBoardingPointAdminAction(payload) : updateArrivalPointAdminAction(payload));
    setShowModel(false);
    setName("");
    setAddress("");
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-[90] bg-black/40 flex justify-center items-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
          {/* Close button */}
          <div className="flex justify-end">
            <RxCross1
              size={24}
              className="cursor-pointer"
              onClick={() => setShowModel(false)}
            />
          </div>

          {/* Header */}
          <h3 className="text-center text-2xl font-medium text-gray-700 mb-6">
            {isBoarding ? "Update Boarding Point" : "Update Arrive Point"}
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl"
            >
              {city}
            </div>

            <input
              type="text"
              placeholder={`${
                isBoarding ? "Boarding Point" : "Arrive Point"
              } Name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl"
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-3xl mb-4"
          />

          <button
            onClick={()=> handleClick(city)}
            className="w-full bg-gray-400 text-white py-2 rounded-3xl hover:bg-gray-500 transition"
          >
            Update Boarding Point
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModalBoardingArrive;
