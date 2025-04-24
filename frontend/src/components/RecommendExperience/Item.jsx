import React, { useEffect, useState } from 'react'
import { LuMapPin } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/WishlistAction';
import toast from 'react-hot-toast';

const Item = ({data}) => {
    const { wishlist } = useSelector((state) => state.WishlistReducer);
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector(state=>state.UserReducer)

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data._id)) {
          setClick(true);
        } else {
          setClick(false);
        }
      }, [wishlist]);
      const removeFromWishlistHandler = (data) => {
        if(isAuthenticated){
            setClick(!click);
        dispatch(removeFromWishlist(data));
        }
        else{
            toast.error("Please login to use wishlist")
        }
        
      };
    
      const addToWishlistHandler = (data) => {
        if(isAuthenticated){
            setClick(!click);
            // console.log(data)
            dispatch(addToWishlist(data));
        }
        else{
            toast.error("Please login to use wishlist")
        }
        
      };
  return (
    <>
        <div className='h-[396px] rounded-[24px] border-[1px] border-[#F3F4F6]'>
            <div className='w-full h-[219px] relative'>
                {/* <div className='absolute top-[15px] left-[10px]  px-[12px] rounded-[30px] text-white bg-[#B91C1C] py-[4px]'>
                    <p className='font-[500] text-[12px] leading-[16px]'>-0% today</p>
                    </div> */}
               
                {
                    !click?
                    (
                        <div onClick={() => addToWishlistHandler(data)} className='absolute top-[10px] right-[10px] rounded-[30px] bg-[#00000059] flex items-center justify-center p-2 cursor-pointer'>
                            <FaRegHeart color='white' title="Add to wishlist" className='w-[20px] h-[20px]' />
                        </div>
                    ):(
                        <div  onClick={() => removeFromWishlistHandler(data)} className='absolute top-[10px] right-[10px] rounded-[30px] bg-pink-400 flex items-center justify-center p-2 cursor-pointer'>
                    <FaRegHeart color='white' title="Remove from wishlist" className='w-[20px] h-[20px]' />
                </div>
                    )
                }

                <img className='w-full h-full object-cover cursor-pointer rounded-tr-[24px] rounded-tl-[24px] ' src={`${data?.photos?.[0]}`} alt="" />
            </div>
            <div className='w-full p-[16px] rounded-b-[24px] bg-white'>
                <div className='flex flex-col gap-[10px] mb-[10px] '>
                   
                    <h4 className='text-[18px] font-[500] leading-[28px] min-h-16 flex shrink-0'>{data.name}</h4>
                    <div className='flex items-center min-h-10 text-[#6B7280]'>
                        <LuMapPin size={26} className="pr-1" color='#6B7280'/> <span className='text-[14px] font-[400] leading-[20px]'>{data.address} - {data.city}</span>
                    </div>
                </div>
                {/* line */}
                <div className='w-[56px] h-[1px]  bg-[#F3F4F6]'></div>
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[16px] font-[500] leading-[24px] text-black'>${new Intl.NumberFormat("en-US").format(data.cheapestPrice)} <span className='text-[#6B7280]'>/night</span></p>
                        <div className='flex items-center'>
                        <FaStar size={25} className="pr-2" color='#DC2626'/> {data.rating} ({data.num_reviews})
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </>
  )
}

export default Item