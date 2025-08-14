import React, { useEffect, useState } from "react";
import iconMap from '../../data/iconMap';
import { RxCross1 } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
import { editServicesApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";

const ModelUpdateService = ({ setServicesDefault, servicesDefault, setShowModel, data }) => {
  const [icon, setIcon] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setIcon(data?.icon);
    setName(data?.name);
    setDescription(data?.description);
    setDropdownOpen(false);
  }, [data]);

  const handleIconChange = (iconKey) => {
    setIcon(iconKey);
    setDropdownOpen(false);
  };

  const handleClick = async () => {
    if (!name) return toast.error("Name must not be empty");
    if (!icon) return toast.error("Icon must not be empty");

    const dataBody = { icon, description, ...(name !== data.name && { name }) };
    const res = await editServicesApi(data._id, dataBody);

    if (res.success) {
      toast.success("Edit service successfully!");
      setShowModel(false);
      const tmp = servicesDefault.map(i => i._id === res.data._id ? res.data : i);
      setServicesDefault(tmp);
    } else {
      toast.error(res.message);
      setShowModel(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[90] bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
        {/* Close button */}
        <div className="flex justify-end">
          <RxCross1
            size={24}
            className="cursor-pointer"
            onClick={() => setShowModel(false)}
          />
        </div>

        {/* Header */}
        <h3 className="text-center text-2xl font-medium text-gray-700 mb-6">
          Edit Service
        </h3>

        {/* Name & Icon */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Service name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl"
          />

          <div className="relative flex-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl flex items-center justify-between"
            >
              {icon ? React.createElement(iconMap[icon], { size: 20 }) : "Select Icon"}
              <BiChevronDown size={20} />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-3xl p-2 grid grid-cols-2 gap-2">
                {Object.keys(iconMap).map((iconKey) => (
                  <button
                    key={iconKey}
                    className="flex items-center gap-2 px-2 py-1 w-full hover:bg-gray-100 rounded-lg"
                    onClick={() => handleIconChange(iconKey)}
                  >
                    {React.createElement(iconMap[iconKey], { size: 20 })}
                    <span className="truncate">{iconKey}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description & Update button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl"
          />

          <button
            onClick={handleClick}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-3xl hover:bg-gray-500 transition"
          >
            Update Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelUpdateService;
