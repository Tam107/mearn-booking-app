import React from 'react'
import { useNavigate } from 'react-router';
import { FaEllipsisH, FaHotel } from "react-icons/fa"; // Import icons

const OrderList = ({data}) => {
    const navigate =useNavigate()
    const getStatusColor = (status) => {
        if (status === "request") return "bg-red-500"; // Đỏ cho trạng thái "request"
        if (status === "pending") return "bg-yellow-500"; // Vàng cho trạng thái "pending"
        if (status === "confirm") return "bg-green-500"; // Xanh cho trạng thái "confirm"
        return "bg-gray-500"; // Màu xám mặc định nếu không khớp
      };
      const handleSeeDetails = (order) => {
        // console.log(order);
        
        if (order.status.toLowerCase() === "request") {
            console.log(1);
            
          navigate(`/booking/${order._id}`); // Điều hướng đến trang booking/id
        } else if (
          order.status.toLowerCase() === "pending" ||
          order.status.toLowerCase() === "confirm"
        ) {
          navigate(`/order/${order._id}`); // Điều hướng đến trang order/detail/id
        }
      };
  return (
    <>
        <div className=" bg-gray-100 p-6 pb-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order History
              </h2>
              <div className="space-y-4">
                {data?.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
                  >
                    {/* Thông tin đơn hàng */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Booking ID{" "}
                          <span className="font-bold text-gray-800">
                            {order._id}
                          </span>
                        </p>
                        <div className="flex items-center">
                          <p className="text-lg font-bold border-r pr-1 mr-1  text-gray-800">
                            {new Intl.NumberFormat("vi-VN").format(order?.totalPrice)}{" "} 
                            VND
                          </p>
                         
                          <p className="text-lg font-bold text-gray-800">
                            ${new Intl.NumberFormat("vi-VN").format(order?.totalPriceUSD)}{" "} 
                            
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md mt-2">
                        <FaHotel className="text-blue-500" />
                        <p className="text-lg font-semibold text-gray-800">
                           {order?.roomType?.hotel?.name} - {order?.roomType?.RoomType}
                        </p>
                      </div>
                      <div className="flex mt-2 justify-between items-center gap-4">
                        <span
                          className={`text-white text-sm px-3 py-1 rounded-full ${getStatusColor(order.status.toLowerCase())}`}
                        >
                          {order.status}
                        </span>

                        <button onClick={() => handleSeeDetails(order)}  className="text-blue-500 cursor-pointer font-semibold hover:underline">
                          See Details
                        </button>
                      </div>
                    </div>
                    {/* Trạng thái, giá và nút */}
                  </div>
                ))}
              </div>
            </div>
          </div>
    </>
  )
}

export default OrderList
