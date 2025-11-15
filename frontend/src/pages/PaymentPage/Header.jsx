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

     
    </div>
  );
};

export default Header;