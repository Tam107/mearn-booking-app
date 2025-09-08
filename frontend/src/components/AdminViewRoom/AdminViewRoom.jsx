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
import Search from "antd/es/input/Search";

const AdminViewRoom = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const stateHotels = useSelector((state) => state.HotelReducer);
  const stateRooms = useSelector((state) => state.RoomReducer);
  const [hotelSelectedId, setHotelSelectedId] = useState("");
  const [dataRooms, setDataRooms] = useState(stateRooms?.rooms);

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
    if (searchText) {
      const lower = dataRooms.toLowerCase();
      let tmp = dataRooms.filter(
        (hotel) =>
          hotel?.RoomType?.toLowerCase().includes(lower) ||
          hotel?.hotel?.city?.toLowerCase().includes(lower) ||
          hotel?.hotel?.name?.toLowerCase().includes(lower) ||
          hotel?.hotel?.type?.toLowerCase().includes(lower)
      );
      setDataRooms(tmp);
    } else {
      setDataRooms(stateRooms?.rooms);
    }
  }, [searchText]);

  console.log(dataRooms);

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
      render: (text) => new Intl.NumberFormat("de-DE").format(text) + " VND",
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
