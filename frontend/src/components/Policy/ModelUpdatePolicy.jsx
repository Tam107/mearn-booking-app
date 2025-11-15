import React, { useEffect, useState } from "react";
import iconMap from "../../data/iconMap";
import { RxCross1 } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
import { editPolicyApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";

const ModelUpdatePolicy = ({
  data,
  setShowModel,
  typePolicyDefault,
  policy,
  setPolicy,
}) => {
  const [icon, setIcon] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [typePolicy, setTypePolicy] = useState("");

  useEffect(() => {
    setIcon(data?.icon);
    setName(data?.name);
    setTypePolicy(data?.type);
    setDropdownOpen(false);
  }, [data]);

  const handleIconChange = (iconKey) => {
    setIcon(iconKey);
    setDropdownOpen(false);
  };

  const handleClick = async () => {
    if (!name) return toast.error("Name must not be empty");

    const dataBody = { icon, typePolicy, ...(name !== data.name && { name }) };
    const res = await editPolicyApi(data._id, dataBody);

    if (res.success) {
      toast.success("Policy updated successfully!");
      setShowModel(false);
      const tmp = policy.map((i) => (i._id === res.data._id ? res.data : i));
      setPolicy(tmp);
    } else {
      toast.error(res.message);
      setShowModel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 overflow-auto max-h-[90vh]">
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
          Edit Policy
        </h3>

        {/* Name & Icon */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Policy name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* Type & Update button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={typePolicy}
            onChange={(e) => setTypePolicy(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl"
          >
            <option disabled value="" className="text-gray-200">
              Select type of policy
            </option>
            {typePolicyDefault?.map((i, ind) => (
              <option key={ind} value={i}>
                {i}
              </option>
            ))}
          </select>

          <button
            onClick={handleClick}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-3xl hover:bg-gray-500 transition"
          >
            Update Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelUpdatePolicy;
