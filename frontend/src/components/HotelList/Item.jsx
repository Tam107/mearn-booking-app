import React, { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/WishlistAction";
import { FaStar } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Item = ({ i }) => {
  const { wishlist } = useSelector((state) => state.WishlistReducer);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if (wishlist && wishlist.find((data) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
  const removeFromWishlistHandler = (data) => {
    if (isAuthenticated) {
      setClick(!click);
      dispatch(removeFromWishlist(data));
    } else {
      toast.error("Please login to use wishlist");
    }
  };

  const addToWishlistHandler = (data) => {
    if (isAuthenticated) {
      setClick(!click);
      // console.log(data)
      dispatch(addToWishlist(data));
    } else {
      toast.error("Please login to use wishlist");
    }
  };
  const navigate = useNavigate();

  console.log(i);

  return (
    <>
      <div className="py-[20px] cursor-pointer w-full flex items-center gap-[20px] border-t border-gray-200">
        <div
          onClick={() => {
            navigate(i.slug);
          }}
          className="border border-gray-200  w-[250px]"
        >
          <img
            src={i?.photos[0]}
            className="w-full aspect-[4/3] rounded-lg object-cover"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col gap-[10px] ">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-[400] text-[14px] leading-[22px] text-gray-500">
                {i.type} in {i.city}
              </p>
              <h4 className="font-[500] text-[20px] leading-[32x] text-gray-700">
                {i.name}
              </h4>
            </div>
            <div>
              {!click ? (
                <AiOutlineHeart
                  size={30}
                  className="z-[60]"
                  onClick={() => addToWishlistHandler(i)}
                />
              ) : (
                <AiFillHeart
                  size={30}
                  className="text-pink-400 z-[60]"
                  onClick={() => removeFromWishlistHandler(i)}
                />
              )}
            </div>
          </div>
          <div className="bg-gray-200 w-[40px] h-[1px]"></div>
          <div className="flex items-center justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-[400] text-[14px] leading-[22px] text-gray-500">
              {i?.roomType.map((type, index) => {
                  const isLastItem = index === i.roomType.length - 1;
                  return (
                    <span key={index}>
                      {type}
                      {!isLastItem && " · "}
                    </span>
                  );
                })}
              </p>
              <p className="font-[400] text-[14px] leading-[22px] text-gray-500">
                {i?.services.map((service, index) => {
                  const isLastItem = index === i.services.length - 1;
                  return (
                    <span key={index}>
                      {service.name}
                      {!isLastItem && " · "}
                    </span>
                  );
                })}
              </p>

            </div>
          </div>
          <div>
              <p className="font-[500] text-[18px] leading-[28px] text-gray-700">
              {new Intl.NumberFormat("en-US").format(i.cheapestPrice)}{" VND "}
    <span className="font-[400] text-[14px] leading-[20px]">
      /night
    </span>
              </p>
            </div>
          </div>
       
          <div className="bg-gray-200 w-[40px] h-[1px]"></div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <p className="font-[400] text-[14px] leading-[22px] text-gray-500">
                {i.rating}
              </p>
              <FaStar className="text-amber-500" size={20} />
              <p className="font-[400] text-[14px] leading-[22px] text-gray-500">
                ({i.numberRating||0}) ratings
              </p>
            </div>

            
             <Link to={`/homes/${i.slug}`} className="px-2 py-2 border border-gray-300 hover:bg-pink-400 hover:text-white duration-200 transition rounded-2xl flex items-center gap-4">
                <p className="text-sm font-[500]">Explore More</p>
                <FaArrowRightLong size={14}/>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
