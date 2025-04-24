import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/WishlistAction';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const WishList = ({setOpenWishList}) => {
    const { wishlist } = useSelector((state) => state.WishlistReducer);
        const {isAuthenticated} = useSelector(state=>state.UserReducer)
    
    const dispatch = useDispatch();
    const removeFromWishlistHandler = (data) => {
      if(isAuthenticated){
        dispatch(removeFromWishlist(data));
      }else{
        toast.error("Please login to use wishlist")
      }
      };
    
     



  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-50">
      <div className="fixed top-0 right-0 h-full w-[20%] overflow-y-scroll  bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5 className='p-3'>Your Wish List is empty. Start adding your favorite items!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishList(false)}
                />
              </div>
              {/* Item length */}
              <div className={`flex items-center p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


const CartSingle = ({ data,removeFromWishlistHandler }) => {
  const navigate = useNavigate()
    return (
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <RxCross1 className="cursor-pointer mb-['unset'] ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
          />
          <img
          onClick={()=>{navigate("/homes/"+data.slug)}}
          
            src={data?.photos[0]}
            alt=""
            className="w-[90px] h-min ml-2 mr-2 rounded-[5px] z-50"
          />
  
          <div className="pl-[5px]">
            <h1 className='z-50' onClick={()=>{navigate("/hotel"+"/a")}}>{data.name}</h1>
            <h4 className="font-[600] pt-3 pt-[3px] text-[17px] text-[#d02222] font-Roboto">
               {new Intl.NumberFormat("en-US").format(data.cheapestPrice)} VND <span className='text-[#d02212] text-[15px] font-[500] '> /night</span>
            </h4>
          </div>
          <div>
            <BsCartPlus  onClick={()=>{navigate("/homes/"+data.slug)}} size={24} className="cursor-pointer" tile="Add to cart"
             
            />
          </div>
        </div>
      </div>
    );
  };

export default WishList