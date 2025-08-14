import React, { useState } from "react";
import iconMap from "../../data/iconMap";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { deleteServicesApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";
import ModelUpdateService from "../ModelUpdateService/ModelUpdateService";
import { useMediaQuery } from "react-responsive";

const Item = ({
  isView,
  services,
  handleServiceChange,
  servicesDefault,
  service,
  setServicesDefault,
}) => {
  const [hover, setHover] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleDelete = async () => {
    const res = await deleteServicesApi(service._id);
    if (res.success) {
      toast.success(res.message);
      const tmp = servicesDefault.filter((i) => i._id !== service._id);
      setServicesDefault(tmp);
    } else {
      toast.error("Failed to delete service");
    }
  };

  const handleUpdate = () => {
    setShowEdit(true);
  };

  const renderIcons = () => (
    <div className="absolute top-1 right-1 flex items-center gap-2">
      <div
        onClick={handleUpdate}
        className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white cursor-pointer"
      >
        <MdOutlineEdit size={16} />
      </div>
      <div
        onClick={handleDelete}
        className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white cursor-pointer"
      >
        <MdOutlineDeleteOutline size={16} />
      </div>
    </div>
  );

  return (
    <>
      {isView && services?.includes(service?._id) ? (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative"
        >
          <label className="cursor-pointer h-20 border border-gray-300 p-2 flex rounded-2xl gap-1 items-center">
            <input
              onChange={() => handleServiceChange(service?._id)}
              type="checkbox"
              className="mr-2"
              checked={services?.includes(service?._id)}
            />
            <span className="mr-2">
              {iconMap[service?.icon]
                ? React.createElement(iconMap[service?.icon])
                : null}
            </span>
            <span className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
              {service?.name}
            </span>
          </label>

          {/* Icons */}
          {isMobile ? renderIcons() : hover && renderIcons()}
        </div>
      ) : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative"
        >
          <label className="cursor-pointer h-20 border border-gray-300 p-2 flex rounded-2xl gap-1 items-center">
            <input
              onChange={() => handleServiceChange(service?._id)}
              type="checkbox"
              className="mr-2"
              checked={services?.includes(service?._id)}
            />
            <span className="mr-2">
              {iconMap[service?.icon]
                ? React.createElement(iconMap[service?.icon])
                : null}
            </span>
            <span className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
              {service?.name}
            </span>
          </label>

          {/* Icons */}
          {isMobile ? renderIcons() : hover && renderIcons()}
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <ModelUpdateService
          setServicesDefault={setServicesDefault}
          servicesDefault={servicesDefault}
          data={service}
          setShowModel={setShowEdit}
        />
      )}
    </>
  );
};

export default Item;
