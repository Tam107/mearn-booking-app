import React, { useState } from "react";
import Header from "../BookingPage/Header";
import BookingBus from "../../components/BookingBus/BookingBus";

const BookingBusPage = () => {
  

  return (
    <>
      <Header />
      <div className="bg-[#F7F9FA]">
        <BookingBus/>
      </div>
    </>
  );
};

export default BookingBusPage;
