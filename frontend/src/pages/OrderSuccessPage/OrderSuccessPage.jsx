import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaCheckCircle } from 'react-icons/fa'; // Import biểu tượng tick OK
import Header from '../PaymentPage/Header';
import { getBookingApi } from '../../../Axios/client/api';
import toast from 'react-hot-toast';
import Footer from '../../components/Footer/Footer';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  const [data, setData] = useState();

  const fetchApi = async () => {
    const res = await getBookingApi(id);

    if (res.success) {
      if (!res.data?.stepPayment) {
        toast.error('Fill the information first');
        navigate(`/booking/${id}`);
      }
      if (!res.data?.isPaid) {
        toast.error('Payment first');
        navigate(`/payment/${id}`);
      }
      setData(res.data);
    } else {
      toast.error('No booking found');
      navigate('/homes');
    }
  };

  useEffect(() => {
    fetchApi();
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center animate-fade-in">
        {/* Header */}
        <div className="text-center mt-10">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-6xl animate-bounce" /> {/* Biểu tượng tick OK */}
          </div>
          <h1 className="text-4xl font-bold text-gray-800">THANK YOU FOR YOUR ORDER</h1>
          <p className="text-lg text-gray-600 mt-4">
            Your order number is: <span className="font-semibold">{id}</span>.
          </p>
          <p className="text-lg text-gray-600">
            We’ll email you an order confirmation with details and tracking info.
          </p>
          <div className='flex items-center gap-4 justify-center'>
          <button
            onClick={handleGoHome}
            className="mt-6 cursor-pointer bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            Explore more stays
          </button><button
            onClick={handleGoHome}
            className="mt-6 cursor-pointer bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            View Order
          </button>
          </div>
        </div>

        {/* Product Suggestions */}
        <div className="mt-12 w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">HOTEL YOU MAY LIKE</h2>
          <Swiper
            loop={true}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5} // Hiển thị tối đa 5 mục
            navigation // Hiển thị nút điều hướng
          >
            {data?.roomType?.photos?.map((product) => (
              <SwiperSlide key={product}>
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <img
                    src={product}
                    alt={product}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                </div>
              </SwiperSlide>
            ))}
            {data?.roomType?.hotel?.photos?.map((product) => (
              <SwiperSlide key={product + 'hotel'}>
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <img
                    src={product}
                    alt={product}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default OrderSuccessPage;