// iconMap.js
import { FaSpa, FaSwimmingPool, FaGym, FaBed, FaWifi, FaConciergeBell, FaHiking } from 'react-icons/fa';
import { MdRestaurant, MdDirectionsCar, MdAirplanemodeActive, MdLocalTaxi, MdShoppingCart } from 'react-icons/md';
import { IoIosAirplane, IoIosBoat } from 'react-icons/io';
import { GiCoffeeCup, GiBicycle, GiSkiing } from 'react-icons/gi';

// Đối tượng ánh xạ tên icon thành component icon từ react-icons
const iconMap = {
  FaSpa: <FaSpa />,
  FaSwimmingPool: <FaSwimmingPool />,
  FaGym: <FaGym />,
  FaBed: <FaBed />,
  FaWifi: <FaWifi />,
  FaConciergeBell: <FaConciergeBell />,
  FaHiking: <FaHiking />,
  MdRestaurant: <MdRestaurant />,
  MdDirectionsCar: <MdDirectionsCar />,
  MdAirplanemodeActive: <MdAirplanemodeActive />,
  MdLocalTaxi: <MdLocalTaxi />,
  MdShoppingCart: <MdShoppingCart />,
  IoIosAirplane: <IoIosAirplane />,
  IoIosBoat: <IoIosBoat />,
  GiCoffeeCup: <GiCoffeeCup />,
  GiBicycle: <GiBicycle />,
  GiSkiing: <GiSkiing />,
  // Thêm các icon khác nếu cần
};

export default iconMap;
