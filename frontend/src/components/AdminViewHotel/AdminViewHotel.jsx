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

const AdminViewHotel = () => {
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [open, setOpen] = useState(false);
  const [hotelSelected, setHotelSelected] = useState("");
  const [hotelSelectedId, setHotelSelectedId] = useState("");
  const [input, setInput] = useState("");
  const [hotelPopup, setHotelPopup] = useState(stateHotels?.hotels);
  const [dataHotels, setDataHotels] = useState(stateHotels.hotels);

  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleSearchChange = (e) => {
    setInput(e.target.value);
    setHotelPopup(
      stateHotels.hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setDataHotels(stateHotels?.hotels);
    setHotelPopup(stateHotels?.hotels);
  }, [stateHotels.hotels, dispatch]);

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
          <div className="relative shadow px-4 border bg-white p-2 rounded-3xl w-full md:w-[300px]">
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer flex items-center justify-between"
            >
              <p className="text-gray-600">
                {hotelSelected.length > 0 ? hotelSelected : "Select Home"}
              </p>
              <BiChevronDown size={20} />
            </div>
            {open && (
              <ul className="absolute z-50 px-4 pb-2 top-10 left-0 bg-gray-500 overflow-y-auto max-h-56 rounded-3xl mt-2 w-full">
                <div className="flex sticky top-0 items-center gap-2 bg-gray-500 p-2">
                  <AiOutlineSearch className="text-gray-200" size={20} />
                  <input
                    type="text"
                    value={input}
                    onChange={handleSearchChange}
                    placeholder="Enter hotel name"
                    className="placeholder:text-gray-200 text-gray-200 flex-1 p-2 outline-none bg-transparent"
                  />
                </div>
                {hotelPopup?.map((hotel) => (
                  <li
                    onClick={() => {
                      setOpen(false);
                      setHotelSelected(hotel.name);
                      setHotelSelectedId(hotel._id);
                    }}
                    key={hotel._id}
                    className="text-white text-[16px] cursor-pointer hover:text-blue-300"
                  >
                    {hotel.name}
                  </li>
                ))}
                {hotelPopup?.length === 0 && (
                  <p className="text-white text-[16px]">
                    No homes available for the search.
                  </p>
                )}
              </ul>
            )}
          </div>
          {/* Get all */}
          <div
            onClick={() => {
              setHotelSelected("");
              setHotelSelectedId("");
              setOpen(false);
              setInput("");
              setHotelPopup(stateHotels.hotels);
            }}
            className="cursor-pointer shadow-2xl px-4 border border-gray-300 bg-white p-2 flex items-center justify-center rounded-3xl whitespace-nowrap"
            >
            Get All
          </div>
        </div>
        {/* Create button */}
        <Link
          to="/dashboard-create-home"
          className="shadow px-4 border bg-white p-2 flex items-center justify-center rounded-3xl whitespace-nowrap"
        >
          Create homes
        </Link>
      </div>

      {/* Table / Mobile Cards */}
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
