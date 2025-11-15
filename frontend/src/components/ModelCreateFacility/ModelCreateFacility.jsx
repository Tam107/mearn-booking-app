import React, { useState } from "react";
import iconMap from "../../data/iconMap"; // import the iconMap
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import {
  createFacilitiesApi,
  createServicesApi,
} from "../../../Axios/client/api";
import toast from "react-hot-toast";

const ModelCreateFacility = ({
  setShowCreateFacility,
  setFacilities,
  facilities,
  isBus = false,
}) => {
  const [icon, setIcon] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleIconChange = (iconKey) => {
    setIcon(iconKey);
    setDropdownOpen(false); // Close the dropdown after selecting an icon
  };
  const [name, setName] = useState();

  const handleClick = async () => {
    if (!name) {
      return toast.error("Please enter the facility name");
    }
    let data = { name: name, isBus };
    if (icon) data.icon = icon;
    const res = await createFacilitiesApi(data);
    if (res.success) {
      toast.success("Create facility success");
      setShowCreateFacility(false);
      setName("");
      setIcon("");
      if (setFacilities) {
        setFacilities([...facilities, res.data._id]);
      }
    } else {
      toast.error(res.message);
      setShowCreateFacility(false);
      setName("");
      setIcon("");
    }
  };

  return (
    <>
      <div className="w-full fixed top-0 left-0 h-screen z-50 bg-[#00000042]">
        <div className="mx-auto p-6 w-[60%] rounded-3xl my-40 bg-white">
          <div className="w-full flex items-center justify-end">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setShowCreateFacility(false)}
              size={20}
            />
          </div>
          <div className="w-full text-center">
            <h3 className="font-[500] text-[28px] text-gray-500">
              Create new facility
            </h3>
          </div>
          <div className="w-full my-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Facility name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[49%] px-4 py-2 border border-gray-400 rounded-3xl"
            />
            <div className="w-[50%] relative ">
              <div className="flex px-4 py-2 border border-gray-400 rounded-3xl  w-full items-center justify-between">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full  flex items-center gap-2"
                >
                  {icon
                    ? React.createElement(iconMap[icon], { size: 20 })
                    : "Select Icon"}{" "}
                  <p>{icon && icon}</p>
                </button>
                <div className="">
                  <BiChevronDown className="cursor-pointer" size={20} />
                </div>
              </div>

              {dropdownOpen && (
                <div className="absolute overflow-y-auto h-60 w-full mt-2 top-6 left-0 bg-white border border-gray-400 rounded-3xl z-10">
                  <div className="grid grid-cols-2">
                    {Object.keys(iconMap).map((iconKey) => (
                      <button
                        key={iconKey}
                        onClick={() => handleIconChange(iconKey)}
                        className="w-full px-4 py-2 text-left flex items-center gap-2"
                      >
                        {React.createElement(iconMap[iconKey], { size: 20 })}{" "}
                        {iconKey}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={handleClick}
            className=" w-full cursor-pointer my-4 bg-gray-400 px-4 py-2 rounded-3xl flex items-center justify-center text-white "
          >
            Add Facility
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelCreateFacility;
