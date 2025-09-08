import { Popconfirm, Table, Input, Select, Slider } from "antd";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { deleteBusAction } from "../../redux/actions/BusAction";
import { Link } from "react-router";

const { Search } = Input;
const { Option } = Select;

const AdminViewBus = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const stateBus = useSelector((state) => state.BusReducer);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const confirm = (id) => {
    dispatch(deleteBusAction(id));
  };

  const filteredBuses = useMemo(() => {
    let buses = stateBus?.busesAdmin || [];

    if (searchText) {
      const lower = searchText.toLowerCase();
      buses = buses.filter(
        (bus) =>
          bus.poName?.toLowerCase().includes(lower) ||
          bus._id?.toLowerCase().includes(lower) ||
          bus.cityFrom?.toLowerCase().includes(lower) ||
          bus.cityTo?.toLowerCase().includes(lower)
      );
    }

    return buses;
  }, [searchText, stateBus?.busesAdmin]);

  const columns = [
    // { title: "ID", dataIndex: "_id", key: "_id", width: 220, ellipsis: true },
    {
      title: "Bus Name",
      dataIndex: "poName",
      key: "poName",
      width: 250,
      ellipsis: true,
    },
    {
      title: "City From",
      dataIndex: "cityFrom",
      key: "cityFrom",
      width: 150,
      ellipsis: true,
    },
    {
      title: "City To",
      dataIndex: "cityTo",
      key: "cityTo",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
      render: (text) => {
        const date = new Date(text);
        return new Intl.DateTimeFormat("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        }).format(date);
      },
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      render: (text) => {
        const date = new Date(text);
        return new Intl.DateTimeFormat("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        }).format(date);
      },
    },
    { title: "Total Seats", dataIndex: "totalSeats", key: "totalSeats" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(text),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span className="flex gap-3">
          <Link to={`/dashboard-edit-bus/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Delete the bus?"
            onConfirm={() => confirm(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <p className="text-[#1777FF] cursor-pointer hover:text-[#69b1ff]">
              Delete
            </p>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full py-6 px-4">
      {/* 🔍 Search & Filter toggle */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <Search
          placeholder="Search by Name, City, Type..."
          allowClear
          onSearch={(val) => setSearchText(val)}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-xl shadow-sm"
          style={{ width: 280 }}
        />
      </div>

      {/* Table / Mobile cards */}
      {isMobile ? (
        <div className="space-y-4">
          {filteredBuses.map((bus) => (
            <div
              key={bus._id}
              className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
            >
              <p>
                <strong>Bus Name:</strong> {bus.poName}
              </p>
              <p>
                <strong>From:</strong> {bus.cityFrom}
              </p>
              <p>
                <strong>To:</strong> {bus.cityTo}
              </p>
              <p>
                <strong>Price:</strong> ${bus.price}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredBuses}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={{ x: 1000, y: 500 }}
        />
      )}
    </div>
  );
};

export default AdminViewBus;
