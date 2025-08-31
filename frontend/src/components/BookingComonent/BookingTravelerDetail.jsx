import { Input } from "antd";
import React, { useState } from "react";
import ItemTravelerDetail from "./ItemTravelerDetail";

const BookingTravelerDetail = ({ seats, travelerDetails, setTravelerDetails, processPayment }) => {
  console.log(travelerDetails);
  
  const handleChange = (index, field, value) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[index][field] = value;
    setTravelerDetails(updatedDetails);
  };
  return (
    <>
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Traveler Details</h2>
          <p className="text-gray-500 mb-4">
            Please ensure all information is accurate for smooth processing.
          </p>
        </div>
      </div>
      {[...Array(parseInt(seats) || 1)].map((_, index) => (
        <ItemTravelerDetail processPayment={processPayment} key={index} index={index} handleChange={handleChange} travelerDetails={travelerDetails}/>
      ))}
    </>
  );
};

export default BookingTravelerDetail;
