import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  getAllBookingApi,
  updateStatusBookingApi,
} from "../../../Axios/client/api";

const AdminViewOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRow, setLoadingRow] = useState(null);

  // Check mobile
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  const handleConfirm = async (record) => {
    setLoadingRow(record._id);
    const res = await updateStatusBookingApi(record._id);
    if (res.success) {
      const updatedData = data.map((item) =>
        item._id === res.data._id ? res.data : item
      );
      setData(updatedData);
    }
    setLoadingRow(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Hotel",
      dataIndex: ["roomType", "hotel", "name"],
      key: "hotel",
      render: (hotelName) => hotelName || "N/A",
      width: 200,
    },
    {
      title: "Room Type",
      dataIndex: ["roomType", "RoomType"],
      key: "roomType",
      render: (roomType) => roomType || "N/A",
      width: 150,
    },
    {
      title: "Check-in / Check-out",
      key: "checkinCheckout",
      width: 200,
      render: (_, record) => (
        <div className="text-sm">
          <p>
            <strong>In:</strong>{" "}
            {new Date(record.checkIn).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Out:</strong>{" "}
            {new Date(record.checkOut).toLocaleDateString("en-GB")}
          </p>
        </div>
      ),
    },
    {
      title: "Total Price (VND)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 160,
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
      width: 120,
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-white text-xs ${
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
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleConfirm(record)}
          disabled={
            record.status?.toLowerCase() === "confirm" ||
            loadingRow === record._id
          }
        >
          {loadingRow === record._id ? "Processing..." : "Confirm Payment.js"}
        </Button>
      ),
    },
  ];
  

  return (
    <div className="py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Paid Bookings</h1>

      {isMobile ? (
        // Mobile view as Card List
        <div>
          {data.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500 break-words">
                <strong>ID:</strong> {item._id}
              </p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Hotel:</strong> {item.roomType?.hotel?.name || "N/A"}</p>
              <p><strong>Room Type:</strong> {item.roomType?.RoomType || "N/A"}</p>
              <p>
                <strong>Check-in:</strong>{" "}
                {new Date(item.checkIn).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {new Date(item.checkOut).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.totalPrice || 0)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    item.status?.toLowerCase() === "pending"
                      ? "bg-yellow-500"
                      : item.status?.toLowerCase() === "confirm"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <Button
                type="primary"
                size="small"
                onClick={() => handleConfirm(item)}
                disabled={
                  item.status?.toLowerCase() === "confirm" ||
                  loadingRow === item._id
                }
                className="mt-2"
              >
                {loadingRow === item._id ? "Processing..." : "Confirm Payment.js"}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table view
        <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
        }}
        scroll={{
          x: 1000, // Cho phép scroll ngang khi màn hình nhỏ hơn bảng
          y: 500,  // Scroll dọc, cố định header
        }}
        className="bg-white rounded-md shadow-sm"
      />
      )}
    </div>
  );
};

export default AdminViewOrders;
