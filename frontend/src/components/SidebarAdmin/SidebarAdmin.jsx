import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaList, FaHome } from "react-icons/fa";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { MdOutlineMeetingRoom, MdOutlineDomainAdd } from "react-icons/md";
import { LuHotel } from "react-icons/lu";
import { IoMdBus } from "react-icons/io";
import { PiBusDuotone } from "react-icons/pi";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const SidebarAdmin = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navStyle = (path) =>
    `flex items-center space-x-3 cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-100 ${
      location.pathname === path ? "bg-indigo-100" : ""
    }`;

  // Đóng sidebar khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Đóng sidebar khi click vào menu trên mobile
  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Icon menu 3 gạch */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-2 left-4 z-30 bg-indigo-600 text-white p-2 rounded-md shadow-md"
        >
          <FaBars />
        </button>
      )}

      {/* Overlay mờ */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#00000080] bg-opacity-30 z-10 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen bg-white shadow-sm z-20 w-[200px] overflow-y-auto transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col">
            <div className="h-12 flex items-center justify-center">
              <Link to="/dashboard">
                <span className="text-2xl font-[500] text-[#6439ff]">
                  HOVN Admin
                </span>
              </Link>
            </div>
            <hr className="border-t border-gray-200" />

            {/* Menu */}
            <div className="px-2 flex-1">
              <ul
                className="space-y-4 flex flex-col gap-1 mb-0"
                onClick={handleMenuClick}
              >
                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">MAIN</p>
                <Link to="/dashboard">
                  <li className={navStyle("/dashboard")}>
                    <DashboardIcon className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Dashboard
                    </span>
                  </li>
                </Link>

                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">LISTS</p>
                <Link to="/dashboard-view-orders">
                  <li className={navStyle("/dashboard-view-orders")}>
                    <FaList size={20} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Orders
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard-view-homes">
                  <li className={navStyle("/dashboard-view-homes")}>
                    <FaHome size={25} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Homes
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard-view-room">
                  <li className={navStyle("/dashboard-view-room")}>
                    <MdOutlineMeetingRoom size={25} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Rooms
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard-view-bus">
                  <li className={navStyle("/dashboard-view-bus")}>
                    <IoMdBus size={25} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Bus
                    </span>
                  </li>
                </Link>

                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">ACTIONS</p>
                <Link to="/dashboard-create-home">
                  <li className={navStyle("/dashboard-create-home")}>
                    <MdOutlineDomainAdd size={25} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Create Home
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard-create-room">
                  <li className={navStyle("/dashboard-create-room")}>
                    <LuHotel size={25} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Create Room
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard-create-bus">
                  <li className={navStyle("/dashboard-create-bus")}>
                    <PiBusDuotone size={25} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Create Bus
                    </span>
                  </li>
                </Link>

                <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                  <NotificationsNoneIcon className="text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600">
                    Notifications
                  </span>
                </li>

                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">SERVICE</p>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                  <SettingsSystemDaydreamOutlinedIcon className="text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600">
                    System Health
                  </span>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                  <PsychologyOutlinedIcon className="text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600">
                    Logs
                  </span>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                  <SettingsApplicationsIcon className="text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600">
                    Settings
                  </span>
                </li>

                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">USER</p>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                  <AccountCircleOutlinedIcon className="text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600">
                    Profile
                  </span>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                  <ExitToAppIcon className="text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-600">
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-2 px-2 pb-4">
            <div className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-200"></div>
            <div className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-800"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
