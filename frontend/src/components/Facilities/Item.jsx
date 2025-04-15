import React, { useState } from "react";
import iconMap from "../../data/iconMap";
import { Tooltip } from "antd";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { deleteFacilitiesApi, deleteServicesApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";
import ModelUpdateService from "../ModelUpdateService/ModelUpdateService";
import ModelUpdateFacility from "../ModelUpdateFacility/ModelUpdateFacility";

const Item = ({ setFacilitiesDefault,facilitiesDefault, data,handleFaChange,facilities }) => {
    const [hover, setHover] = useState(false)
    const [showEdit,setShowEdit] = useState(false)

    const handleDelete =async (event) => {
      const res=  await deleteFacilitiesApi(data._id)
      if(res.success){
          toast.success(res.message)
          const tmp = facilitiesDefault.filter(i=>{
            if(i._id !== data._id) return i
          })
          console.log(setFacilitiesDefault);
          
          setFacilitiesDefault(tmp)
      }
      else{
        toast.error(res.message)
      }

    }

    const handleUpdate = (event) => {
      setShowEdit(true);

    }

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative"
      >
        <label className="cursor-pointer  h-20 border border-gray-300 p-2 flex rounded-2xl gap-1 items-center">
          <input
                      onChange={() => handleFaChange(data._id)}
                      type="checkbox"
            className="mr-2"
            checked={facilities.includes(data._id)}
          />

          <span className={data?.icon ? "mr-2" : ""}>
            {iconMap[data?.icon]
              ? React.createElement(iconMap[data?.icon])
              : null}
          </span>

          <span className="text-sm overflow-hidden line-clamp-3">{data?.name}</span> {/* Thêm overflow-hidden và truncate */}
          </label>
        {hover && (
          <div className="absolute top-1 right-1 flex items-center gap-2">
            <Tooltip
              title="Edit facility"
              className="w-5 h-5 z-50 rounded-full bg-green-500 hover:bg-green-600 transition duration-200 flex items-center justify-center text-white"
            >
              <MdOutlineEdit
               onClick={handleUpdate}
                size={5} />
            </Tooltip>
            <Tooltip
              title="Delete facility"
              className="w-5 h-5 z-50 rounded-full bg-red-400 hover:bg-red-500 transition duration-200 flex items-center justify-center text-white"
            >
              <MdOutlineDeleteOutline 
              onClick={handleDelete} 
              size={10} />
            </Tooltip>
          </div>
        )}
      </div>

      {
          showEdit && (<>
          
            <ModelUpdateFacility data={data} facilitiesDefault={facilitiesDefault} setFacilitiesDefault={setFacilitiesDefault} setShowModel={setShowEdit}/>
          </>)
        }
    </>
  );
};

export default Item;
