import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { uploadByFilesApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";

const UploadImg = ({ setPhotos, photos }) => {
  const [loading, setLoading] = useState(false);

  function removePhoto(filename) {
    setPhotos([...photos.filter((photo) => photo !== filename)]);
  }

  const addPhotoByFile = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();

    setLoading(true);

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const invalidFiles = Array.from(files).filter(
      (file) => !validImageTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Only image files are allowed.");
      setLoading(false); // Reset loading state
      return;
    }

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    try {
      const res = await uploadByFilesApi(data);

      if (res.success) {
        const newImg = res.data.map((item) => item.url);
        setPhotos((prevPhotos) => [...prevPhotos, ...newImg]);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid gap-2 mt-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        <label
          style={{ cursor: "pointer" }}
          className="border h-32 border-gray-300 border-dashed cursor-pointer bg-transparent rounded-2xl p-6 flex items-center justify-center text-2xl text-gray-600"
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={addPhotoByFile}
          />
          <IoCloudUploadOutline />
          Upload
        </label>

        {photos?.length > 0 &&
          photos?.map((item, index) => (
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
        {loading && (
          <label
          style={{ cursor: "pointer" }}
          className="border border-gray-300 border-dashed cursor-pointer bg-transparent rounded-2xl p-6 flex items-center justify-center text-2xl text-gray-600"
        >
          <div className="w-6 h-6 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        </label>
          
        )}
      </div>
    </>
  );
};

export default UploadImg;
