import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { getAllBookingApi, updateStatusBookingApi } from "../../../Axios/client/api";

const AdminViewOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRow, setLoadingRow] = useState(null); // Lưu trạng thái loading của từng hàng
  const fetchApi = async () => {
    setLoading(true);
    const res = await getAllBookingApi();
    if (res.success) {
      const filteredData = res.data.filter((i) => i.isPaid === true);
      setData(filteredData);
    } else {
      message.error("Failed to fetch bookings");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleConfirm = async(record) => {
    // Xử lý hành động xác nhận
    // message.success(`Confirmed booking with ID: ${record._id}`);
    setLoadingRow(record._id); // Đặt trạng thái loading cho hàng hiện tại
    const res = await updateStatusBookingApi(record._id);
    if (res.success) {
      const updatedData = data.map((item) =>
        item._id === res.data._id ? res.data : item
      );
      setData(updatedData);
    }
    setLoadingRow(null); // Đặt lại trạng thái loading

    
    // Thêm logic xử lý API nếu cần
  };

  const columns = [
    {
      title: " ID",
      dataIndex: "_id",
      key: "_id",
      width: 100, // Đặt chiều rộng cố định
      ellipsis: true, // Kích hoạt cắt nội dung nếu quá dài
      render: (id) => (
        <div className="break-words whitespace-normal">{id}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hotel",
      dataIndex: ["roomType", "hotel", "name"],
      key: "hotel",
      render: (hotelName) => hotelName || "N/A",
    },
    {
      title: "Room Type",
      dataIndex: ["roomType", "RoomType"],
      key: "roomType",
      render: (roomType) => roomType || "N/A",
    },
    {
      title: "Check-in / Check-out",
      key: "checkinCheckout",
      render: (_, record) => (
        <div>
          <p>
            <strong>Check-in:</strong>{" "}
            {new Date(record.checkIn).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(record.checkOut).toLocaleDateString("en-GB")}
          </p>
        </div>
      ),
    },
    {
      title: "Total Price (VND)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price || 0),
    },
   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-white ${
            status?.toLowerCase() === "pending"
              ? "bg-yellow-500"
              : status?.toLowerCase() === "confirm"
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleConfirm(record)}
          className="bg-blue-500 hover:bg-blue-600"
          disabled={
            record.status?.toLowerCase() === "confirm" || loadingRow === record._id
          } // Vô hiệu hóa nếu đã xác nhận hoặc đang loading
        >
          {loadingRow === record._id ? "Processing..." : "Confirm Payment"}
        </Button>
      ),
    },
  ];

  return (
    <div className="py-6 px-6">
      <h1 className="text-2xl font-bold mb-4">Paid Bookings</h1>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        bordered
      
      />
    </div>
  );
};

export default AdminViewOrders;