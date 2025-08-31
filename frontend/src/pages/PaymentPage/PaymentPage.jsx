import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router";
import { getBookingApi, getPayPalClientApi } from "../../../Axios/client/api";
import Payment from "../../components/Payment/Payment";
// import Booking from "../../components/Booking/Booking";

const PaymentPage = () => {
    const {id} = useParams()
    const [data,setData] = useState()
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [clientID, setClientId] = useState(null);
     const [totalPrice, setTotalPrice] = useState(0);
     const navigate  = useNavigate()
     const getPaypalClientId = async () => {
      const res = await getPayPalClientApi();
      
      setClientId(res);
    };
    
    const fetchPrice = async (data) => {
      
  
      if (data?.checkOut && data?.checkIn) {
          
        let tmpInfoPrice = [];
        let tmp = 0;
        const priceExtra = data?.roomType?.priceExtra?.map((i) => ({
          date: new Date(i.start),
          price: i.title,
        }));
  
        const checkInDate = new Date(data?.checkIn);
        const checkOutDate = new Date(data?.checkOut);
        const dateArray = [];
        let currentDate = new Date(checkInDate);
  
        while (currentDate < checkOutDate) {
          dateArray.push(new Date(currentDate)); // Tạo một bản sao mới của currentDate
          currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày lên 1
        }
        setNumberOfDays(dateArray.length);
  
        
  
        dateArray.forEach((date) => {
          const matchingPrice = priceExtra.find(
            (i) => i.date.toDateString() === date.toDateString()
          );
          if (matchingPrice) {
            tmpInfoPrice.push(matchingPrice);
            tmp += matchingPrice.price;
          } else {
            tmp += data?.roomType?.price;
          }
        });
        //   setInfoPrice(tmpInfoPrice);
          setTotalPrice(tmp);
      }
    };
    
    
    const fetchApi = async () => {
    
        const res = await getBookingApi(id);
    
        if (res.success) {
          
          if(!res.data?.stepPayment){
            toast.error("Fill the information first");
            navigate(`/booking/${id}`)
          }
          if(res.data.status ==="Pending" || res.status==="Confirm"){
            // toast.error("No booking founld");
            navigate("/order/"+res.data._id)
            return;
          }
          
          setData(res.data);
        } else {
          toast.error("No booking founld");
          navigate("/homes")
        }
      };
    useEffect(()=>{fetchApi()
      getPaypalClientId()
    },[id])
    useEffect(()=>{fetchPrice(data)},[data])
    

  return (
    <>
      <Header />
      <div className="bg-[#F7F9FA]">
        {/* <Booking/> */}
        <Payment id={id} clientID={clientID} data={data} totalPrice={totalPrice} numberOfDays={numberOfDays}/>
      </div>
    </>
  );
};

export default PaymentPage;
