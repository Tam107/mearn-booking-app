import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const UploadImg = ({addPhotoByFile,removePhoto,photos}) => {
  return (
    <>
      <div className="grid gap-2 mt-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        <label className="border border-gray-300 border-dashed cursor-pointer bg-transparent rounded-2xl p-6 flex items-center justify-center text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={addPhotoByFile}
          />
          <IoCloudUploadOutline />
          Upload
        </label>

        {photos.length > 0 &&
          photos.map((item, index) => (
            <div key={index} className="h-32 relative flex">
              <img src={item} className="rounded-2xl w-full object-cover" />
              <div
                onClick={() => removePhoto(item)}
                className="absolute top-0 right-0 w-6 h-6 text-sm flex items-center justify-center text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition z-50 duration-300"
              >
                X
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UploadImg;
