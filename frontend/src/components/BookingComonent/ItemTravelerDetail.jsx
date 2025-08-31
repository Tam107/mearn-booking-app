import { Input } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ItemTravelerDetail = ({ index, travelerDetails, handleChange, processPayment }) => {
    const [save,setSave] = useState(false)
    const handleSave = () =>{  
        if(!save){
            if(travelerDetails[index].name === "" || travelerDetails[index].email === "" || travelerDetails[index].phoneNumber === ""){
                toast.error("Please fill in all required fields.");
                return;
            }
        }
        setSave(!save)
    }
    useEffect(()=>{
        if(processPayment){
            setSave(true)
        }
    },[processPayment])
  return (
    <>
      <div className="pt-4 mt-4 mb-6 bg-white rounded-lg">
        <div className={`px-6 flex items-center justify-between ${!save && "border-b border-gray-300"}`}>
          <h2 className="text-lg font-semibold mb-4 ">{ save ? travelerDetails?.[index]?.name: `Adult ${index + 1}`}</h2>
          <h2 className="text-lg font-semibold mb-4 text-blue-400 cursor-pointer" onClick={handleSave}>
            {save ? "Edit Details" : "Save"}
          </h2>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-4 ${save && "hidden"}`}>
          <div>
            <label className="block font-medium mb-1">Contact's Name</label>
            <Input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
              value={travelerDetails?.[index]?.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Contact's Email Address
            </label>
            <Input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
              value={travelerDetails?.[index]?.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <Input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your mobile number"
                value={travelerDetails?.[index]?.phoneNumber}
                onChange={(e) => handleChange(index, "phoneNumber", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTravelerDetail;
