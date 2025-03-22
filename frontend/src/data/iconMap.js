// Import the individual icons from react-icons
import { FaSpa, FaSwimmingPool, FaBed, FaWifi, FaConciergeBell, FaHiking } from 'react-icons/fa';
import { MdRestaurant, MdDirectionsCar, MdAirplanemodeActive, MdLocalTaxi, MdShoppingCart } from 'react-icons/md';
import { IoIosAirplane, IoIosBoat } from 'react-icons/io';
import { GiCoffeeCup } from 'react-icons/gi';

// Create a map that associates icon names with their components
const iconMap = {
  FaSpa: FaSpa,
  FaSwimmingPool: FaSwimmingPool,
  FaBed: FaBed,
  FaWifi: FaWifi,
  FaConciergeBell: FaConciergeBell,
  FaHiking: FaHiking,
  MdRestaurant: MdRestaurant,
  MdDirectionsCar: MdDirectionsCar,
  MdAirplanemodeActive: MdAirplanemodeActive,
  MdLocalTaxi: MdLocalTaxi,
  MdShoppingCart: MdShoppingCart,
  IoIosAirplane: IoIosAirplane,
  IoIosBoat: IoIosBoat,
  GiCoffeeCup: GiCoffeeCup,

  // Add more icons if necessary
};

export default iconMap;
