import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { LuShoppingCart } from "react-icons/lu";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useSelector } from "react-redux";
import WishList from "../WishList/WishList";

const Header = () => {
  const [active, setActive] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const stateUser = useSelector(state => state.UserReducer);
  const { wishlist } = useSelector(state => state.WishlistReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle = (isActive) =>
    `flex hover:bg-[#F3F4F6] hover:rounded-full text-sm duration-200 transition font-[400] text-[16px] leading-[24px] cursor-pointer py-[8px] rounded-[999px]  px-[20px]  ${
      isActive ? "text-[#374151] bg-[#F3F4F6]" : "text-[#6B7280]"
    }`;

  const handleOrder = () => {
    navigate("/orderlist");
  };

  return (
    <div className="relative mb-[90px]">
      {/* Desktop Header */}
      <div className={`${active ? "bg-gray-200" : ""} fixed top-0 w-full z-50 transition duration-200`}>
        <div className="hidden md:flex items-center justify-between h-[70px] px-6">
          <NavLink to="/">
            <p className="text-[25px] font-[600] uppercase">highlightsofvietnam</p>
          </NavLink>

          <div className="flex gap-2">
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/bus">Bus Ticket</NavLink>
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/b">Train Ticket</NavLink>
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/c">Things Todo</NavLink>
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/d">HaLong Bay Cruises</NavLink>
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/homes">Homes</NavLink>
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/packageTour">Package Tour</NavLink>
            <NavLink className={({ isActive }) => navStyle(isActive)} to="/hotDeal">Hot Deal</NavLink>
          </div>

          <div className="flex gap-2 items-center">
            <LuShoppingCart className="cursor-pointer" onClick={handleOrder} size={28} />
            <div onClick={() => setOpenWishList(true)} className="cursor-pointer relative">
              <AiOutlineHeart size={28} />
              <span className="absolute top-0 right-0 rounded-full w-4 h-4 bg-pink-400 text-white text-[12px] flex items-center justify-center">
                {wishlist?.length}
              </span>
            </div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <CgProfile size={28} color="#000000" className="ml-2" />
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-2">
          <NavLink to="/"><p className="text-[20px] font-semibold uppercase">highlightsofvietnam</p></NavLink>
          <div className="flex gap-2 items-center">
            <LuShoppingCart className="cursor-pointer" onClick={handleOrder} size={24} />
            <AiOutlineHeart onClick={() => setOpenWishList(true)} size={24} className="relative" />
            <button
              className="text-2xl font-bold"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col z-40">
            <NavLink to="/bus" className="p-3 border-b">Bus Ticket</NavLink>
            <NavLink to="/b" className="p-3 border-b">Train Ticket</NavLink>
            <NavLink to="/c" className="p-3 border-b">Things Todo</NavLink>
            <NavLink to="/d" className="p-3 border-b">HaLong Bay Cruises</NavLink>
            <NavLink to="/homes" className="p-3 border-b">Homes</NavLink>
            <NavLink to="/packageTour" className="p-3 border-b">Package Tour</NavLink>
            <NavLink to="/hotDeal" className="p-3">Hot Deal</NavLink>
          </div>
        )}
      </div>

      {/* Wishlist Overlay */}
      {openWishList && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg overflow-y-auto">
            <div className="flex justify-end p-2">
              <button onClick={() => setOpenWishList(false)}>✕</button>
            </div>
            <WishList setOpenWishList={setOpenWishList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
