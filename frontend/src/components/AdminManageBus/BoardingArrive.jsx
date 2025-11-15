import React, { useState } from "react";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { deleteBoardingPointAdminAction, deleteArrivalPointAdminAction } from "../../redux/actions/BusAction";
import EditModalBoardingArrive from "./EditModalBoardingArrive";

const BoardingArrive = ({ isBoarding, data, array, setArray }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    dispatch(isBoarding ? deleteBoardingPointAdminAction(data?._id) : deleteArrivalPointAdminAction(data?._id));
    let newTmp = array.filter((item) => item !== data._id);
    setArray(newTmp);
  };
  const renderIcons = () => (
    <div className="absolute top-1 right-1 flex items-center gap-2">
      <div
          onClick={() => setShowEdit(true)}
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
  const handleChange = (e) => {
    if (e.target.checked) {
      setArray([...array,data._id]);
    } else {
      let newTmp = array.filter((item) => item !== data._id);
      setArray(newTmp);
    }
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
            onChange={handleChange}
            type="checkbox"
            className="mr-2"
            checked={array?.includes(data?._id)}
          />
          <div>
            <span className="text-md font-medium break-words overflow-hidden text-ellipsis line-clamp-3">
              {data?.name}
            </span>
            <span className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">
              {data?.address}
            </span>
          </div>
        </label>

        {isMobile ? renderIcons() : hover && renderIcons()}
      </div>

      {/* Edit Modals */}
      {showEdit && <EditModalBoardingArrive isBoarding={isBoarding} setShowModel={setShowEdit} city={data.city} data={data} />}
    </>
  );
};

export default BoardingArrive;
