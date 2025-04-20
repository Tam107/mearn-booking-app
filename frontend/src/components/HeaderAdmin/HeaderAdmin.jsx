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
import { MdPayment } from 'react-icons/md';
const HeaderAdmin = () => {
  return (
    <>
        <div className="h-12 flex items-center justify-between py-2 px-4 ">
        <div className="flex h-full items-center border-[1px] border-gray-200 p-1.5">
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none bg-transparent text-sm placeholder:text-xs"
          />
          <SearchOutlinedIcon />
        </div>
        <div className="flex items-center justify-between mr-4 gap-6">
          <div className="flex items-center">
            <DarkModeOutlinedIcon
              className="text-gray-600 cursor-pointer"
              fontSize="large"
            />
          </div>
         
          <div className="flex items-center">
            <Tooltip title="Store" arrow>
              <StoreIcon
                className="text-gray-600 cursor-pointer"
                fontSize="large"
              />
            </Tooltip>
          </div>
          <div className="flex items-center">
            <Tooltip title="Credit Card" arrow>
              <CreditCardIcon
                className="text-gray-600 cursor-pointer"
                fontSize="large"
              />
            </Tooltip>
          </div>
          <div className="flex items-center">
            <Tooltip title="Delivery" arrow>
              <LocalShippingIcon
                className="text-gray-600 cursor-pointer"
                fontSize="large"
              />
            </Tooltip>
          </div>
          <div className="flex items-center">
            <Tooltip title="Notifications" arrow>
              <NotificationsNoneIcon
                className="text-gray-600 cursor-pointer"
                fontSize="large"
              />
            </Tooltip>
          </div>
          <div className="flex items-center">
            <Tooltip title="Settings" arrow>
              <SettingsApplicationsIcon
                className="text-gray-600 cursor-pointer"
                fontSize="large"
              />
            </Tooltip>
          </div>
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-[30px] h-[30px] rounded-full"
            />
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200" />
    </>
  )
}

export default HeaderAdmin
