import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const AdminViewRoom = () => {
  const stateHotels = useSelector((state) => state.HotelReducer);
  const [open, setOpen] = useState(false);
  const [hotelSelected,setHotelSelected] = useState("");
  const [hotelSelectedId,setHotelSelectedId] = useState("");

  const [hotelPopup, setHotelPopup] = useState(stateHotels.hotels);
  const [input, setInput] = useState();
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

  return (
    <>
      <div className="w-full py-6 px-6">
        <div className="w-full flex gap-6">
          <div className="w-[40%] relative shadow-2xl px-4 border border-gray-300 bg-white p-2 rounded-3xl">
           <div onClick={()=>{setOpen(!open)}} className="w-full  cursor-pointer flex items-center justify-between ">
             <p  className="font-[400] text-gray-600">{hotelSelected.length>0? hotelSelected : "Select Hotel"}</p>
            <BiChevronDown className="cursor-pointer" size={20} />
           </div>

            {open && (
              <>
                <ul className="w-[100%] absolute px-4 pb-2 top-6 left-0 bg-gray-500 overflow-y-auto max-h-40 rounded-3xl mt-2">
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
                        onClick={()=>{
                            setOpen(false);
                            setHotelSelected(hotel.name)
                            setHotelSelectedId(hotell._id)
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
          <div onClick={()=>{
            setHotelSelected("")
            setHotelSelectedId("")
            setOpen(false)
            setInput("")
            setHotelPopup(stateHotels.hotels)
          }} className="w-32 cursor-pointer shadow-2xl px-4 border border-gray-300 bg-white p-2 flex items-center justify-center rounded-3xl ">
            Get All
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewRoom;
