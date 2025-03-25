import { message, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { deleteHotelAction, getAllHotelsAction } from "../../redux/actions/HotelAction";
import { getAllRoomsAction } from "../../redux/actions/RoomAction";
// import {Link} from "react-router-dom"
const AdminViewHotel = () => {
  
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [open, setOpen] = useState(false);
  const [hotelSelected, setHotelSelected] = useState("");
  const [hotelSelectedId, setHotelSelectedId] = useState("");
  const [input, setInput] = useState("");
  const [hotelPopup, setHotelPopup] = useState(stateHotels?.hotels);
  const handleSearchChange = (e) => {
    setInput(e.target.value);
    setHotelPopup(
      stateHotels.hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const [dataHotels, setDataHotels] = useState(stateHotels.hotels);
  
  const dispatch = useDispatch();
  // dispatch(getAllHotelsAction());
  useEffect(() => {
    setDataHotels(stateHotels?.hotels);
    setHotelPopup(stateHotels?.hotels);
  }, [stateHotels.hotels,dispatch]);

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




  const confirm = (e) => {
    // console.log(e);
    dispatch(deleteHotelAction(e));
    setDataHotels(dataHotels.filter((hotel) => hotel._id !== e));
    dispatch(getAllRoomsAction())
    dispatch(getAllHotelsAction())
    toast.success('Delete success');

  }


  const columns = [
    {
      title: "Hotel",
      dataIndex: "name",
      key: "hotel name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Cheapest Price",
      dataIndex: "cheapestPrice",
      key: "cheapestPrice",
      render: (text) => {
        return (
          <span style={{ whiteSpace: "nowrap" }}>
            {new Intl.NumberFormat("de-DE").format(text)} VND
          </span>
        );
      },
    },

    {
      title: "Room Type",
      dataIndex: "roomType",
      render: (roomType) => {
        return (
          <>
            {roomType.map((type, ind) => (
              <p
                key={ind}
                style={{
                  margin: 0,
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {type}
              </p>
            ))}
          </>
        );
      },
      // Optionally set the minimum width for the column
      width: 150, // Adjust this value as needed
    },

    {
      title: "Services",
      dataIndex: "services",
      render: (services) => {
        return (
          <>
            {services.map((service, ind) => (
              <p
                key={ind}
                style={{
                  margin: 0,
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {service.name}
              </p>
            ))}
          </>
        );
      },
      // Optionally set the minimum width for the column
      width: 150, // Adjust this value as needed
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/dashboard-hotel/" + record.slug}>View</Link>
          <Link to={"/dashboard-hotel/" + record.slug}>Edit</Link>
          <Popconfirm
            title="Delete the hotel?"
            description="Are you sure to delete this hotel and all rooms of hotel?"
            onConfirm={()=>{confirm(record._id)}}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <p className="text-[#1777FF] cursor-pointer hover:text-[#69b1ff]">Delete</p>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="w-full py-6 px-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex-1 flex gap-6">
            <div className="w-[40%] relative shadow-2xl px-4 border border-gray-300 bg-white p-2 rounded-3xl">
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="w-full  cursor-pointer flex items-center justify-between "
              >
                <p className="font-[400] text-gray-600">
                  {hotelSelected.length > 0 ? hotelSelected : "Select Hotel"}
                </p>
                <BiChevronDown className="cursor-pointer" size={20} />
              </div>

              {open && (
                <>
                  <ul className="w-[100%] z-50 absolute px-4 pb-2 top-6 left-0 bg-gray-500 overflow-y-auto max-h-56 rounded-3xl mt-2">
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
                      <>
                        <li
                          onClick={() => {
                            setOpen(false);
                            setHotelSelected(hotel.name);
                            setHotelSelectedId(hotel._id);
                          }}
                          key={hotel._id}
                          className="text-white break-words text-[16px] cursor-pointer hover:text-blue-300 duration-200 transition"
                        >
                          {hotel.name}
                        </li>
                      </>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div
              onClick={() => {
                setHotelSelected("");
                setHotelSelectedId("");
                setOpen(false);
                setInput("");
                setHotelPopup(stateHotels.hotels);
              }}
              className="w-32 cursor-pointer shadow-2xl px-4 border border-gray-300 bg-white p-2 flex items-center justify-center rounded-3xl "
            >
              Get All
            </div>
            
          </div>
            <Link to={"/dashboard-create-home"} style={{whiteSpace:"nowrap"}} className=" cursor-pointer shadow-2xl px-4 border border-gray-300 bg-white p-2 flex items-center justify-center rounded-3xl ">Create homes</Link>
        </div>
        <div className="w-full">
          <Table columns={columns} dataSource={dataHotels} />
        </div>
      </div>
    </>
  );
};

export default AdminViewHotel;
