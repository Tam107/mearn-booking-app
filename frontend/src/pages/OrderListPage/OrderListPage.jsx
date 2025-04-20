import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import { getBookingByEmailApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";
import OrderList from "../../components/OrderList/OrderList";

const OrderListPage = () => {
  const stateUser = useSelector((state) => state.UserReducer);
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    if (stateUser.isAuthenticated) {
      const res = await getBookingByEmailApi(stateUser?.user?.email);
      if (!res.success) {
        return toast.error(res.message);
      } else {
        setData(res.data);
      }
    }
  };
//   console.log(data);
  

  useEffect(() => {
    fetchApi();
  }, [stateUser.user]);
  
  

  return (
    <>
      <Header />
      {stateUser.isAuthenticated && (
        <>
          <OrderList data={data}/>
        </>
      )}
      <Footer />
    </>
  );
};

export default OrderListPage;
