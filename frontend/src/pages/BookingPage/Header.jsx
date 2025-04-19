import React from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-white shadow-md py-4 px-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
       
        <span onClick={()=>{navigate("/")}} className="text-xl cursor-pointer text-[#79b0ca] font-semibold">HighlightsOfVietNam</span>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-4 text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
            1
          </span>
          <span>Fill in data</span>
        </div>
        <span>—</span>
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-gray-500 font-semibold">
            2
          </span>
          <span>Pay</span>
        </div>
        <span>—</span>
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-gray-500 font-semibold">
            3
          </span>
          <span>Voucher Sent</span>
        </div>
      </div>
    </div>
  );
};

export default Header;