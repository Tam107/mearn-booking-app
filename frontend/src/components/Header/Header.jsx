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
      `flex hover:bg-[#F3F4F6] hover:rounded-full text-sm duration-200 transition font-[400] text-[16px] leading-[24px] cursor-pointer py-[8px] rounded-[999px] px-[20px]  ${
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
              <p className="text-[20px] font-[600] uppercase">highlightsofvietnam</p>
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
              <LuShoppingCart className="cursor-pointer text-xl text-gray-800 hover:text-pink-500 transition-all duration-200" onClick={handleOrder} size={28} />
              <div onClick={() => setOpenWishList(true)} className="cursor-pointer relative hover:text-pink-500 transition-all duration-200">
                <AiOutlineHeart size={28} />
                <span className="absolute top-0 right-0 rounded-full w-4 h-4 bg-pink-400 text-white text-[12px] flex items-center justify-center">
                  {wishlist?.length}
                </span>
              </div>
              <SignedIn>
                <UserButton afterSignOutUrl="/" className="hover:text-pink-500 transition-all duration-200" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <CgProfile size={28} color="#000000" className="ml-2 hover:text-pink-500 transition-all duration-200" />
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between px-6 py-3 bg-white shadow-md">
            <NavLink to="/">
              <p className="text-[18px] font-semibold text-gray-800 uppercase tracking-wide hover:text-pink-500 transition-all duration-200">highlightsofvietnam</p>
            </NavLink>

            <div className="flex gap-4 items-center">
              {/* Cart Icon */}
              <div className="relative">
                <LuShoppingCart className="cursor-pointer text-xl text-gray-800 hover:text-pink-500 transition-all duration-200" onClick={handleOrder} size={24} />
              </div>

              {/* Wishlist Icon with Badge */}
              <div className="relative">
                <AiOutlineHeart
                    onClick={() => setOpenWishList(true)}
                    size={24}
                    className="cursor-pointer text-xl text-gray-800 hover:text-pink-500 transition-all duration-200"
                />
                <span className="absolute top-0 right-0 rounded-full w-4 h-4 bg-pink-500 text-white text-xs flex items-center justify-center">
                  {wishlist?.length}
                </span>
              </div>

              {/* Hamburger Menu Icon (SVG) */}
              <button
                  className="text-3xl font-semibold text-gray-800 hover:text-pink-500 transition-all duration-200"
                  onClick={() => setMobileMenu(!mobileMenu)}
              >
                {/* SVG Hamburger Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-gray-800 hover:text-pink-500 cursor-pointer"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown with smooth transition */}
          {mobileMenu && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                <div className="flex flex-col items-start p-6">
                  <NavLink to="/bus" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">Bus Ticket</NavLink>
                  <NavLink to="/b" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">Train Ticket</NavLink>
                  <NavLink to="/c" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">Things To Do</NavLink>
                  <NavLink to="/d" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">HaLong Bay Cruises</NavLink>
                  <NavLink to="/homes" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">Homes</NavLink>
                  <NavLink to="/packageTour" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">Package Tour</NavLink>
                  <NavLink to="/hotDeal" className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">Hot Deal</NavLink>

                  {/* Profile Section Inside Mobile Dropdown */}
                  <div className="py-3 text-lg text-gray-800 hover:text-pink-500 transition-all duration-200">
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" className="hover:text-pink-500 transition-all duration-200" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <CgProfile size={28} color="#000000" className="ml-2 hover:text-pink-500 transition-all duration-200" />
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
          )}

          {/* Wishlist Overlay with smooth fade-in */}
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
      </div>
  );
};

export default Header;
