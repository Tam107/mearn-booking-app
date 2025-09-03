import React from 'react'
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Tooltip } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const HeaderAdmin = () => {
  return (
    <>
      {/* 🔹 Thêm justify-end sm:justify-between ở đây */}
      <div className="h-12 flex items-center justify-end sm:justify-between py-2 px-4">
        
        {/* Search box - ẩn trên mobile */}
        <div className="hidden sm:flex h-full items-center">
          
        </div>

        {/* Icon group */}
        <div className="flex items-center justify-between mr-2 sm:mr-4 gap-3 sm:gap-6">
          {/* <DarkModeOutlinedIcon
            className="text-gray-600 cursor-pointer"
            fontSize="medium"
          /> */}
{/* 
          <Tooltip title="Store" arrow>
            <StoreIcon className="text-gray-600 cursor-pointer" fontSize="medium" />
          </Tooltip> */}

          {/* <Tooltip title="Credit Card" arrow>
            <CreditCardIcon className="text-gray-600 cursor-pointer" fontSize="medium" />
          </Tooltip> */}

          {/* <Tooltip title="Delivery" arrow>
            <LocalShippingIcon className="text-gray-600 cursor-pointer" fontSize="medium" />
          </Tooltip> */}

          {/* Ẩn Notification trên màn hình rất nhỏ */}
          <div className="hidden xs:block">
            {/*<Tooltip title="Notifications" arrow>*/}
            {/*  <NotificationsNoneIcon className="text-gray-600 cursor-pointer" fontSize="medium" />*/}
            {/*</Tooltip>*/}
          </div>

          {/*<Tooltip title="Settings" arrow>*/}
          {/*  <SettingsApplicationsIcon className="text-gray-600 cursor-pointer" fontSize="medium" />*/}
          {/*</Tooltip>*/}

          {/* Avatar */}
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Avatar"
            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] rounded-full"
          />
        </div>
      </div>
      <hr className="border-t border-gray-200" />
    </>
  )
}

export default HeaderAdmin
