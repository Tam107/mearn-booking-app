import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ImageHotel from "./ImageHotel";
import InfoHotel from "./InfoHotel";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/WishlistAction";
import { useUser } from "@clerk/clerk-react";

const HotelDetail = () => {
  const [click, setClick] = useState(false);
  const { wishlist } = useSelector((state) => state.WishlistReducer);
  const [open, setOpen] = useState(false);
  //  const [dataRoom,setDataRoom]=useState({});
  const { slug } = useParams();
  const [data, setData] = useState({});
  const { isAuthenticated } = useSelector((state) => state.UserReducer);

  const stateHotels = useSelector((state) => state.HotelReducer);
  // const [roomType, setRoomType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (stateHotels.hotels && stateHotels.hotels.length > 0) {
      // Normalize the slug to match the format in the database

      const hotel = stateHotels.hotels.find((hotel) => hotel.slug === slug);
      if (hotel) {
        setData(hotel || {}); // If no hotel is found, set data as empty object
        setOpen(false);

        if (wishlist && wishlist.find((i) => i._id === hotel._id)) {
          setClick(true);
        } else {
          setClick(false);
        }
      } else {
        toast.error("Not found homes");
        navigate("/homes");
      }
    }
  }, [slug, stateHotels.hotels, wishlist]);
  // useEffect(() => {}, [wishlist]);
  const removeFromWishlistHandler = (data) => {
    if (isSignedIn) {
      setClick(!click);
      dispatch(removeFromWishlist(data));
    } else {
      toast.error("Please login to use wishlist");
    }
  };

  const addToWishlistHandler = (data) => {
    if (isSignedIn) {
      setClick(!click);
      // console.log(data)
      dispatch(addToWishlist(data));
    } else {
      toast.error("Please login to use wishlist");
    }
  };

  // console.log(slug);
  const copyLinkToClipboard = () => {
    const currentUrl = window.location.href; // Get the current page URL
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copied to clipboard!"); // Show success message
      })
      .catch(() => {
        toast.error("Failed to copy link."); // Show error message if copying fails
      });
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-8 md:px-6">
        <div className="w-9/11 pb-8 mx-auto">
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <h3 className="font-[500] text-[30px] leading-[40px] text-black">
                {data?.name}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <FaRegStar color="#DE3151" size={15} />
                    <p className="font-[500] text-[14px] leading-[20px]">
                      {data?.rating}
                    </p>
                  </div>
                  <div className="w-[2px] h-[2px] rounded-full bg-gray-500"></div>
                  <div className="flex items-center gap-1">
                    <p className="font-[500] text-[14px] leading-[20px] underline">
                      {data?.numberRating} reviews
                    </p>
                  </div>
                  <div className="w-[2px] h-[2px] rounded-full bg-gray-500"></div>
                  <div className="flex items-center gap-1">
                    <FaRegBuilding color="#DE3151" size={15} />
                    <p className="font-[500] text-[14px] leading-[20px] text-gray-500">
                      {data?.type}
                    </p>
                  </div>
                  <div className="w-[2px] h-[2px] rounded-full bg-gray-500"></div>
                  <div className="flex items-center gap-1">
                    <p className="font-[500] text-[14px] leading-[20px] text-gray-500">
                      {data?.address}, {data?.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div onClick={() => copyLinkToClipboard()} className="flex cursor-pointer items-center gap-1">
                    <FaRegShareFromSquare size={15} />
                    Share
                  </div>
                  {!click ? (
                    <div
                      onClick={() => addToWishlistHandler(data)}
                      className="cursor-pointer flex items-center gap-1"                    >
                      <FaRegHeart
                      
                        title="Add to wishlist"
                        size={15}
                      />
                      Save
                    </div>
                  ) : (
                    <div
                      onClick={() => removeFromWishlistHandler(data)}
                      className="text-[#FF69B4] cursor-pointer flex items-center gap-1 "
                    >
                      <FaRegHeart
                      
                        title="Remove from wishlist"
                        size={15}
                        color="#FF69B4"
                      />
                      Save
                    </div>
                  )}
                
                </div>
              </div>
            </div>
            <br />
            <ImageHotel
              open={open}
              setOpen={setOpen}
              data={data}
              photos={data?.photos}
            />
            <br />
            <InfoHotel data={data} />

            <div className="mt-4">
              <div className="flex flex-wrap items-stretch justify-start ">
                <div className="w-[42%] mr-[8%]">
                  <div className="mb-10">
                    <div className="mb-1 flex flex-col gap-3">
                      <div>
                        <div className="flex gap-3.5 items-center">
                          <div className="w-[50px] h-[50px] rounded-full">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCxpq6oYeVGX6Xh61BeaGKcp0oDe1CyiurgA&s"
                              className="w-full h-full rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-md">Nigel</p>
                            <p className="text-sm text-gray-400">
                              Raleigh, North Carolina
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <FaStar size={10} />
                          <FaStar size={10} />
                          <FaStar size={10} />
                          <FaStar size={10} />
                        </div>
                        <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                        <div>1 week ago</div>
                      </div>
                    </div>
                    <div>
                      Thời gian lưu trú ở đây rất yên bình và riêng tư. Chủ nhà
                      cũng như những người chăm sóc rất thân thiện và hỗ trợ.
                      Tôi thích nó ở đây 🙂
                    </div>
                  </div>
                </div>
                <div className="w-[42%] mr-[8%]">
                  <div className="mb-10">
                    <div className="mb-1 flex flex-col gap-3">
                      <div>
                        <div className="flex gap-3.5 items-center">
                          <div className="w-[50px] h-[50px] rounded-full">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCxpq6oYeVGX6Xh61BeaGKcp0oDe1CyiurgA&s"
                              className="w-full h-full rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-md">Nigel</p>
                            <p className="text-sm text-gray-400">
                              Raleigh, North Carolina
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <FaStar size={10} />
                          <FaStar size={10} />
                          <FaStar size={10} />
                          <FaStar size={10} />
                        </div>
                        <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                        <div>1 week ago</div>
                      </div>
                    </div>
                    <div>
                      Thời gian lưu trú ở đây rất yên bình và riêng tư. Chủ nhà
                      cũng như những người chăm sóc rất thân thiện và hỗ trợ.
                      Tôi thích nó ở đây 🙂
                    </div>
                  </div>
                </div>
                <div className="w-[42%] mr-[8%]">
                  <div className="mb-10">
                    <div className="mb-1 flex flex-col gap-3">
                      <div>
                        <div className="flex gap-3.5 items-center">
                          <div className="w-[50px] h-[50px] rounded-full">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCxpq6oYeVGX6Xh61BeaGKcp0oDe1CyiurgA&s"
                              className="w-full h-full rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-md">Nigel</p>
                            <p className="text-sm text-gray-400">
                              Raleigh, North Carolina
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <FaStar size={10} />
                          <FaStar size={10} />
                          <FaStar size={10} />
                          <FaStar size={10} />
                        </div>
                        <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                        <div>1 week ago</div>
                      </div>
                    </div>
                    <div>
                      Thời gian lưu trú ở đây rất yên bình và riêng tư. Chủ nhà
                      cũng như những người chăm sóc rất thân thiện và hỗ trợ.
                      Tôi thích nó ở đây 🙂
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetail;
