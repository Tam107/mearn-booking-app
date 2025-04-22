import React, { useState } from "react";
import { getBookingApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const FindOrder = () => {
  const [orderId, setOrderId] = useState("");
  const stateUser = useSelector(state=>state.UserReducer)

  const [data,setData] = useState({})
  const [isLoading, setIsLoading] = useState(false); // State để kiểm soát trạng thái loading

  const handleSearch = async() => {
    // console.log("Searching for order:", orderId);
    if (!orderId.trim()) {
        return toast.error("Please enter a valid order ID");
      }
      setIsLoading(true); // Bắt đầu loading

    const res = await getBookingApi(orderId)

    if(res.success){
        setData(res.data)
        setIsLoading(false); // Kết thúc loading

    }
    else{
        setIsLoading(false); // Kết thúc loading
        setData({})
        return toast.error("No Booking found")
    }
    
    // Add order lookup logic here
  };
  console.log(data);
  const navigate = useNavigate()
  const handleViewDetails = ()=>{
    if(stateUser.isAuthenticated){
        navigate("/order/"+data._id)
    }
    else{
        return toast.error("Please login first")
    }
  }
  

  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">FIND YOUR ORDER</h1>
        <p className="text-gray-600 mb-6">Enter your order ID below:</p>
      </div>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-5 py-4 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
        />
        <button
            onClick={handleSearch}
            disabled={isLoading} // Vô hiệu hóa nút khi đang loading
            className={`w-full cursor-pointer py-3 rounded-lg font-medium transition ${
              isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isLoading ? "SEARCHING..." : "SEARCH ORDER →"}
          </button>
      </div>
     
    </div>
    {Object.keys(data).length > 0 && (
        <>

<div className="bg-gray-100 w-full py-10">
      <div className="w-[80%] h-full rounded-2xl py-8 px-20 bg-white mx-auto shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 w-full text-center">
          ORDER STATUS
        </h1>
        <div className="flex  items-center gap-6 bg-gray-50 p-6 rounded-lg shadow-sm">
          <img
            src={data?.roomType?.hotel?.photos[0]}
            alt="Order"
            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800">
              Order #{data?._id}
            </h2>
            <p className="text-gray-600">{data?.roomType?.hotel?.name} - {data?.roomType?.RoomType}</p>
            <p className="text-gray-600">
          Check-in:{" "}
          <span className="font-medium text-gray-800">
            {new Date(data?.checkIn).toLocaleDateString()}
          </span>
        </p>
        <p className="text-gray-600">
          Check-out:{" "}
          <span className="font-medium text-gray-800">
            {new Date(data?.checkOut).toLocaleDateString()}
          </span>
        </p>
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
          >
            View Order Details →
          </button>
        </div>
      </div>
    </div>
        </>
    )}
    </>
    
  );
};

export default FindOrder;