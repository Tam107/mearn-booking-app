import React, { useState } from "react";
import iconMap from "../../data/iconMap";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
import ModelUpdatePolicy from "./ModelUpdatePolicy";
import { deletePolicyApi } from "../../../Axios/client/api";
import { useMediaQuery } from "react-responsive";

const Item = ({ typePolicyDefault, policy, setPolicy, policyChecked, data, handlePolicyChange }) => {
  const [hover, setHover] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleDelete = async () => {
    const res = await deletePolicyApi(data._id);
    if (res.success) {
      toast.success(res.message);
      const tmp = policy.filter((i) => i._id !== data._id);
      setPolicy(tmp);
    } else {
      toast.error("Failed to delete policy");
    }
  };

  const handleUpdate = () => {
    setShowEdit(true);
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative"
      >
        <label className="cursor-pointer h-20 border border-gray-300 p-2 flex rounded-2xl gap-1 items-center">
          <input
            onChange={() => handlePolicyChange(data?._id)}
            type="checkbox"
            className="mr-2"
            checked={policyChecked?.includes(data?._id)}
          />

          <span className="mr-2">
            {iconMap[data?.icon] ? React.createElement(iconMap[data?.icon]) : null}
          </span>

          <span className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
            {data?.name}
          </span>
        </label>

        {/* Edit/Delete buttons */}
        <div className="absolute top-1 right-1 flex items-center gap-2">
          {isMobile ? (
            <>
              <div
                onClick={handleUpdate}
                className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white"
              >
                <MdOutlineEdit size={16} />
              </div>
              <div
                onClick={handleDelete}
                className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white"
              >
                <MdOutlineDeleteOutline size={16} />
              </div>
            </>
          ) : (
            hover && (
              <>
                <div
                  className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white cursor-pointer"
                  title="Edit policy"
                  onClick={handleUpdate}
                >
                  <MdOutlineEdit size={16} />
                </div>
                <div
                  className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white cursor-pointer"
                  title="Delete policy"
                  onClick={handleDelete}
                >
                  <MdOutlineDeleteOutline size={16} />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* Update policy modal */}
      {showEdit && (
        <ModelUpdatePolicy
          typePolicyDefault={typePolicyDefault}
          setPolicy={setPolicy}
          policy={policy}
          data={data}
          setShowModel={setShowEdit}
        />
      )}
    </>
  );
};

export default Item;
