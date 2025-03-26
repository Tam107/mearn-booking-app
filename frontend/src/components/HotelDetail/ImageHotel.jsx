import React, { useState } from "react";
import { MdApps } from "react-icons/md";
import { FaAngleLeft, FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const ImageHotel = ({ photos, data,open,setOpen }) => {

  return (
    <>
      <div className="w-full h-[400px] grid grid-cols-2 gap-[8px]">
        <div className=" h-full">
          {photos?.[0] && (
            <img
              className="rounded-tl-[16px] rounded-bl-[16px] object-cover h-full w-full"
              src={photos[0]}
              alt=""
            />
          )}
        </div>
        <div className=" h-full grid grid-rows-2 gap-[8px]">
          <div className="w-full  grid grid-cols-2 gap-[8px]">
            {photos?.[1] && (
              <img className="object-cover h-full" src={photos[1]} alt="" />
            )}
            {photos?.[2] && (
              <img
                className="object-cover h-full rounded-tr-[16px]"
                src={photos[2]}
                alt=""
              />
            )}
          </div>
          <div className="w-full  grid grid-cols-2 gap-[8px]">
            {photos?.[3] && (
              <img className="object-cover h-full" src={photos[3]} alt="" />
            )}
            <div className="relative h-full">
              {photos?.[4] && (
                <img
                  className="object-cover h-full rounded-br-[16px]"
                  src={photos[4]}
                  alt=""
                />
              )}
              <div onClick={()=>setOpen(true)} className=" py-2 px-4 bg-white shadow-md border right-4 bottom-3 absolute rounded-xl flex items-center justify-center gap-2">
                <MdApps size={15} />
                <p className="cursor-pointer font-[500] text-[14px] leading-[20px]">
                  Show all photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <>
          <div className="w-full flex flex-col top-0 left-0 fixed h-screen z-50 bg-white">
            <div className="flex mt-4 items-center justify-between px-6 w-full sticky">
              <FaAngleLeft  onClick={()=>setOpen(false)} className="cursor-pointer" size={25} />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <FaRegShareFromSquare size={15} />
                  Share
                </div>
                <div className="flex items-center gap-1">
                  <FaRegHeart size={15} />
                  Save
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto outline-none">
              <div className="px-52 w-full mt-8 ">
                <div className="mx-auto w-[70%] mb-8 flex flex-col gap-2">
                  {photos?.map((photo, index) => (
                    <img
                      key={index}
                      className="object-cover  w-full rounded-xl"
                      src={photo}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ImageHotel;
