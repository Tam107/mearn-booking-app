import React, { useState } from "react";
import iconMap from '../../data/iconMap';
import { RxCross1 } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
import { createServicesApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";

const ModelCreateService = ({ setShowModel, setServices, services }) => {
  const [icon, setIcon] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const handleIconChange = (iconKey) => {
    setIcon(iconKey);
    setDropdownOpen(false);
  };

  const handleClick = async () => {
    if (!name) return toast.error("Name must not be empty");
    if (!icon) return toast.error("Icon must not be empty");

    const res = await createServicesApi({ name, icon, description });
    if (res.success) {
      toast.success("Create service success");
      setShowModel(false);
      setName("");
      setIcon("");
      if (setServices) {
        setServices([...services, res.data._id]);
      }
    } else {
      toast.error(res.message);
      setShowModel(false);
      setName("");
      setIcon("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] bg-white rounded-3xl p-6 relative">
        <RxCross1
          className="absolute top-4 right-4 cursor-pointer"
          size={24}
          onClick={() => setShowModel(false)}
        />

        <h3 className="text-center font-medium text-2xl mb-6 text-gray-600">
          Create new service
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Service name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-400 rounded-3xl"
          />

          <div className="relative flex-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-400 rounded-3xl"
            >
              {icon
                ? React.createElement(iconMap[icon], { size: 20 })
                : "Select Icon"}
              <BiChevronDown size={20} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-400 rounded-3xl z-10">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {Object.keys(iconMap).map((iconKey) => (
                    <button
                      key={iconKey}
                      onClick={() => handleIconChange(iconKey)}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 w-full"
                    >
                      {React.createElement(iconMap[iconKey], { size: 20 })} {iconKey}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-3xl mb-4"
        />

        <button
          onClick={handleClick}
          className="w-full bg-gray-400 text-white py-2 rounded-3xl hover:bg-gray-500 transition"
        >
          Add Service
        </button>
      </div>
    </div>
  );
};

export default ModelCreateService;
