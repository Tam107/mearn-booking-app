import React from "react";
import iconMap from "../../data/iconMap";
import { Tooltip } from "antd";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

const Services = ({ handleServiceChange, servicesDefault, services }) => {
  return (
    <>
      {servicesDefault.map((service, index) => (
        <label
          key={index}
          className="cursor-pointer relative h-24 border border-gray-300 p-4 flex rounded-2xl gap-2 items-center"
        >
          <input
            onChange={() => handleServiceChange(service._id)}
            type="checkbox"
            className="mr-2"
            checked={services.includes(service._id)}
          />

          <span className="mr-2">
            {iconMap[service.icon]
              ? React.createElement(iconMap[service.icon])
              : null}
          </span>

          <span>{service.name}</span>

          <div
            // onClick={(ev) => removePhoto(ev, item)}
            className="absolute top-1 right-1 flex items-center  gap-2"
          >
            <Tooltip title="Edit service" className="w-5 h-5 z-50 rounded-full bg-green-500 hover:bg-green-600 transition duration-200 flex items-center justify-center text-white">
                <MdOutlineEdit size={5}/>

            </Tooltip>
            <Tooltip title="Delete service" className="w-5 h-5 z-50 rounded-full bg-red-400 hover:bg-red-500 transition duration-200 flex items-center justify-center text-white"><MdOutlineDeleteOutline size={10} />
            </Tooltip>
          </div>
        </label>
      ))}
    </>
  );
};

export default Services;
