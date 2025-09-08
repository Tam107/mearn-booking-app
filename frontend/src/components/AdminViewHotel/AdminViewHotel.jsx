import { message, Popconfirm, Space, Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  deleteHotelAction,
  getAllHotelsAction,
} from "../../redux/actions/HotelAction";
import { getAllRoomsAction } from "../../redux/actions/RoomAction";
import Search from "antd/es/input/Search";

const AdminViewHotel = () => {
  const [searchText, setSearchText] = useState("");
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [hotelSelectedId, setHotelSelectedId] = useState("");
  const [dataHotels, setDataHotels] = useState(stateHotels.hotels);

  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setDataHotels(stateHotels?.hotels);
  }, [stateHotels.hotels, dispatch]);

  useEffect(() => {
    if (searchText) {
      const lower = searchText.toLowerCase();
      let tmp = dataHotels.filter(
        (hotel) =>
          hotel?.name?.toLowerCase().includes(lower) ||
          hotel?.city?.toLowerCase().includes(lower) ||
          hotel?.type?.toLowerCase().includes(lower)
      );
      setDataHotels(tmp);
    } else {
      setDataHotels(stateHotels?.hotels);
    }
  }, [searchText]);

  useEffect(() => {
    if (hotelSelectedId.length > 0) {
      const filterHotels = stateHotels.hotels.filter(
        (hotel) => hotel._id === hotelSelectedId
      );
      setDataHotels(filterHotels);
    } else {
      setDataHotels(stateHotels.hotels);
    }
  }, [hotelSelectedId]);

  const confirm = async (id) => {
    await dispatch(deleteHotelAction(id));
    setDataHotels(dataHotels.filter((hotel) => hotel._id !== id));
    dispatch(getAllRoomsAction());
    dispatch(getAllHotelsAction());
    toast.success("Delete success");
  };

  const columns = [
    { title: "Home", dataIndex: "name", key: "hotel name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "City", dataIndex: "city", key: "city" },
    {
      title: "Cheapest Price",
      dataIndex: "cheapestPrice",
      key: "cheapestPrice",
      render: (text) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {new Intl.NumberFormat("de-DE").format(text)} VND
        </span>
      ),
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      render: (roomType) =>
        roomType?.map((type, ind) => (
          <p key={ind} style={{ margin: 0 }}>
            {type.RoomType}
          </p>
        )),
      width: 250,
    },
    {
      title: "Services",
      dataIndex: "services",
      render: (services) =>
        services.map((service, ind) => (
          <p key={ind} style={{ margin: 0 }}>
            {service.name.length > 15
              ? `${service.name.slice(0, 15)}...`
              : service.name}
          </p>
        )),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/homes/${record.slug}`} target="_blank">
            View
          </Link>
          <Link to={`/dashboard-hotel/${record.slug}`}>Edit</Link>
          <Popconfirm
            title="Delete the hotel?"
            description="Are you sure to delete this hotel and all rooms of hotel?"
            onConfirm={() => confirm(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <p className="text-[#1777FF] cursor-pointer hover:text-[#69b1ff]">
              Delete
            </p>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full py-6 px-4">
      {/* Filter & Actions */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex-1 flex gap-4 w-full md:w-auto">
          {/* Dropdown select */}

          <Search
            placeholder="Search by Name, City, Type..."
            allowClear
            onSearch={(val) => setSearchText(val)}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-xl shadow-sm"
            style={{ width: 280 }}
          />
        </div>
      </div>

      {isMobile ? (
        <div>
          {dataHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500 break-words">
                <strong>Name:</strong> {hotel.name}
              </p>
              <p>
                <strong>Type:</strong> {hotel.type}
              </p>
              <p>
                <strong>City:</strong> {hotel.city}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {new Intl.NumberFormat("de-DE").format(hotel.cheapestPrice)} VND
              </p>
              <p>
                <strong>Room Types:</strong>{" "}
                {hotel.roomType?.map((r) => r.RoomType).join(", ")}
              </p>
              <p>
                <strong>Services:</strong>{" "}
                {hotel.services?.map((s) => s.name).join(", ")}
              </p>
              <div className="mt-2 flex gap-3">
                <Link
                  to={`/homes/${hotel.slug}`}
                  target="_blank"
                  className="text-blue-500"
                >
                  View
                </Link>
                <Link
                  to={`/dashboard-hotel/${hotel.slug}`}
                  className="text-green-500"
                >
                  Edit
                </Link>
                <Popconfirm
                  title="Delete the hotel?"
                  onConfirm={() => confirm(hotel._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <span className="text-red-500 cursor-pointer">Delete</span>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={dataHotels}
          rowKey="_id"
          scroll={{ x: 1000 }}
        />
      )}
    </div>
  );
};

export default AdminViewHotel;
