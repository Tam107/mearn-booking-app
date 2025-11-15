import React, { useEffect, useRef } from 'react'
import Header from '../../components/Header/Header'
import HeroBus from '../../components/Hero/HeroBus'
import BusForm from './BusForm'
import RecommendExperience from '../../components/RecommendExperience/RecommendExperience'
import SuggestionTrainTicket from '../../components/SuggestionTrainTicket/SuggestionTrainTicket'
import Footer from '../../components/Footer/Footer'

const BusPage = () => {
  const busFormRef = useRef(null);

  useEffect(() => {
    if (busFormRef.current) {
      const offsetTop = busFormRef.current.getBoundingClientRect().top + window.scrollY - 100; // Trừ đi 50px
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Header />
      <HeroBus />
      <div ref={busFormRef}>
      <div className="w-11/12 mx-auto mb-10">
        <div className="text-center flex flex-col gap-2 mb-5">
          <h2 className="font-[600] pb-2 text-[36px] leading-[40px] text-[#1F2937]">
            Book Bus Travel Shuttle Tickets with Promo Price
          </h2>
          <p className="font-[400] mx-10 text-[16px] leading-[24px] text-[#6B7280]">
            Booking bus and travel shuttle tickets is now as easy as shopping
            online from Highlights of Vietnam online agent ticket. Find complete
            information of bus and travel routes, schedules, boarding points,
            facilities, and ticket prices in Highlights of Vietnam Lifestyle
            SuperApp.
          </p>
        </div>
        <div className='mx-auto max-w-[960px]'>
        <BusForm/>
        </div>
      </div>
      </div>
      <RecommendExperience />
      <SuggestionTrainTicket />
      <Footer />
    </>
  );
};

export default BusPage;