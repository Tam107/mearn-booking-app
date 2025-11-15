import React, { useState } from "react";
import Header from "./Header";
import Booking from "../../components/Booking/Booking";

const BookingPage = () => {
  

  return (
    <>
      <Header />
      <div className="bg-[#F7F9FA]">
        <Booking/>
      </div>
    </>
  );
};

export default BookingPage;
