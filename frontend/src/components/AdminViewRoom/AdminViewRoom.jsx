import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Popconfirm, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { getAllRoomsAction } from "../../redux/actions/RoomAction";
import { deleteRoomApi } from "../../../Axios/client/api";
import { getAllHotelsAction } from "../../redux/actions/HotelAction";
import toast from "react-hot-toast";

const AdminViewRoom = () => {
  const dispatch = useDispatch();
  const stateHotels = useSelector((state) => state.HotelReducer);
  const stateRooms = useSelector((state) => state.RoomReducer);

  const [open, setOpen] = useState(false);
  const [hotelSelected, setHotelSelected] = useState("");
  const [hotelSelectedId, setHotelSelectedId] = useState("");
  const [dataRooms, setDataRooms] = useState(stateRooms?.rooms);
  const [hotelPopup, setHotelPopup] = useState(stateHotels.hotels);
  const [input, setInput] = useState("");

  useEffect(() => {
    setDataRooms(stateRooms.rooms);
  }, [stateRooms.rooms, stateHotels.hotels, dispatch]);

  useEffect(() => {
    if (hotelSelectedId.length > 0) {
      const filterRooms = stateRooms.rooms.filter(
        (room) => room.hotel._id === hotelSelectedId
      );
      setDataRooms(filterRooms);
    } else {
      setDataRooms(stateRooms?.rooms);
    }
  }, [hotelSelectedId]);

  useEffect(() => {
    setHotelPopup(stateHotels.hotels);
  }, [stateHotels.hotels]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setInput(term);
    if (term.length > 0) {
      const filteredHotels = stateHotels.hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(term.toLowerCase()) ||
          hotel.slug.toLowerCase().includes(term.toLowerCase())
      );
      setHotelPopup(filteredHotels);
    } else {
      setHotelPopup(stateHotels.hotels);
    }
  };

  const confirm = async (record) => {
    const res = await deleteRoomApi(record._id, record.hotel._id);
    if (res.success) {
      toast.success("Delete success");
      dispatch(getAllRoomsAction());
      dispatch(getAllHotelsAction());
    } else {
      toast.error(res.message);
    }
  };

  const columns = [
    {
      title: "Home",
      dataIndex: "hotel",
      key: "hotel name",
      render: (hotel) => <p>{hotel?.name}</p>,
    },
    {
      title: "Room Type",
      dataIndex: "RoomType",
      key: "RoomType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) =>
        new Intl.NumberFormat("de-DE").format(text) + " VND",
    },
    {
      title: "Capacity",
      dataIndex: "maxPeople",
      key: "maxPeople",
    },
    {
      title: "City",
      dataIndex: "hotel",
      render: (hotel) => <p>{hotel?.city}</p>,
    },
    {
      title: "Address",
      dataIndex: "hotel",
      render: (hotel) => <p>{hotel?.address}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/dashboard-view-roomDetail/" + record.slug}>View</Link>
          <Link to={`/dashboard-edit-roomDetail/${record.slug}`}>Edit</Link>
          <Popconfirm
            title="Delete the room?"
            description="Are you sure to delete this room?"
            onConfirm={() => confirm(record)}
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
      {/* Bộ lọc */}
      <div className="w-full flex flex-wrap gap-4 items-center justify-between">
        {/* Dropdown chọn khách sạn */}
        <div className="flex-1 min-w-[250px] relative shadow-2xl px-4 border border-gray-300 bg-white p-2 rounded-3xl">
          <div
            onClick={() => setOpen(!open)}
            className="w-full cursor-pointer flex items-center justify-between"
          >
            <p className="font-[400] text-gray-600 truncate">
              {hotelSelected.length > 0 ? hotelSelected : "Select Home"}
            </p>
            <BiChevronDown className="cursor-pointer" size={20} />
          </div>

          {open && (
            <ul className="w-full z-50 absolute px-4 pb-2 top-6 left-0 bg-gray-500 overflow-y-auto max-h-40 rounded-3xl mt-2">
              <div className="flex z-10 sticky top-0 items-center gap-2 bg-gray-500 p-2">
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
                  key={hotel._id}
                  onClick={() => {
                    setOpen(false);
                    setHotelSelected(hotel.name);
                    setHotelSelectedId(hotel._id);
                  }}
                  className="text-white break-words text-[16px] cursor-pointer hover:text-blue-300 duration-200 transition"
                >
                  {hotel.name}
                </li>
              ))}
              {hotelPopup?.length === 0 && (
                <p className="text-red-400 break-words text-[16px]">
                  No homes available for the search. Try adjusting your options.
                </p>
              )}
            </ul>
          )}
        </div>

        {/* Nút Get All */}
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

      {/* Bảng dữ liệu */}
      <div className="w-full mt-4">
        <Table
          columns={columns}
          dataSource={dataRooms}
          scroll={{ x: 800 }} // Cho phép cuộn ngang khi quá nhiều cột
        />
      </div>
    </div>
  );
};

export default AdminViewRoom;
