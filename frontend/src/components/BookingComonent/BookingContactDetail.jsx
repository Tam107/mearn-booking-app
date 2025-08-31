import React from "react";
import { Input } from "antd";
const BookingContactDetail = ({ name, setName, email, setEmail, phoneNumber, setPhoneNumber }) => {
  return (
    <>
      <div className="mb-6 bg-white rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Contact Details (for E-voucher)
          </h2>
          <p className="text-md text-[#687176]">
            Please fill in all fields correctly to ensure you receive the
            booking confirmation voucher in your email.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Contact's Name</label>
            <Input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <Input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingContactDetail;
