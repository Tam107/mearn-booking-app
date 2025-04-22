import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import WishList from "../WishList/WishList";
import { LuShoppingCart } from "react-icons/lu";

const Header = () => {
  const [active, setActive] = useState(false);
  const stateAuth = useSelector((state) => state.UserReducer);
  const [openWishList, setOpenWishList] = useState(false);
    const { wishlist } = useSelector((state) => state.WishlistReducer);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  const stateUser = useSelector(state=>state.UserReducer)
  const navigate = useNavigate()
  
  const navStyle = (isActive) =>
    `flex hover:bg-[#F3F4F6] hover:rounded-full text-sm duration-200 transition font-[400] text-[16px] leading-[24px] cursor-pointer py-[8px] rounded-[999px]  px-[20px]  ${
      isActive ? " text-[#374151]  bg-[#F3F4F6]" : "text-[#6B7280]"
    }`;
    const handleOrder =()=>{
      navigate("/orderlist")
    }
  return (
    <>
      <div className="relative mb-[90px]">
        <div
          className={`${
            active ? " bg-gray-200" : ""
          } fixed top-0 w-full z-50 transition duration-200`}
        >
          <div className=" mx-auto">
            <div
              className={`hidden md:h-[50px] md:px-6 md:my-[20px] md:flex items-center justify-between`}
            >
              <NavLink to="/">
                <p className="text-[25px] font-[600] uppercase">
                  highlightsofvietnam
                </p>
              </NavLink>
              <NavLink className={({ isActive }) => navStyle(isActive)} to="/a">
                Bus Ticket
              </NavLink>
              <NavLink className={({ isActive }) => navStyle(isActive)} to="/b">
                Train Ticket
              </NavLink>
              <NavLink className={({ isActive }) => navStyle(isActive)} to="/c">
                Things Todo
              </NavLink>
              <NavLink className={({ isActive }) => navStyle(isActive)} to="/d">
                HaLong Bay Cruises
              </NavLink>
              <NavLink
                className={({ isActive }) => navStyle(isActive)}
                to="/homes"
              >
                Homes
              </NavLink>
              <NavLink
                className={({ isActive }) => navStyle(isActive)}
                to="/packageTour"
              >
                Package Tour{" "}
              </NavLink>
              <NavLink
                className={({ isActive }) => navStyle(isActive)}
                to="/hotDeal"
              >
                Hot Deal{" "}
              </NavLink>

              <div className="flex gap-2 items-center">
                <LuShoppingCart className="cursor-pointer" onClick={handleOrder} size={28} />
                <div
                  onClick={() => {
                    setOpenWishList(true);
                  }}
                  className="cursor-pointer relative"
                >
                  <AiOutlineHeart size={28} />
                  <span className="absolute top-0 right-0 rounded-full w-4 h-4 bg-pink-400 text-white text-[12px] p-0 m-0 flex items-center justify-center ">
                    {wishlist?.length}
                  </span>
                </div>
                {stateAuth.isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      {stateAuth.user?.avatar ? (
                        <img
                          className="ml-2 object-cover w-[32px] h-[32px] rounded-full"
                          alt=""
                          src={`${stateAuth.user.avatar}`}
                        />
                      ) : (
                        <CgProfile size={28} color="#000000" className="ml-2" />
                      )}
                    </Link>
                  </>
                ) : (
                  <Link to={"/login"}>
                    <CgProfile size={28} color="#000000" className="ml-2" />{" "}
                  </Link>
                )}

                {/*<img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-trai-dep-Viet-Nam-58.jpg' className="ml-2 object-cover w-[32px] h-[32px] rounded-full" alt=""/>*/}
              </div>
            </div>
          </div>
        </div>
        {
          openWishList? (
              <WishList setOpenWishList={setOpenWishList}/>
          ) :null
        }
      </div>
    </>
  );
};

export default Header;
