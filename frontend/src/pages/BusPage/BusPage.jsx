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
        <BusForm />
      </div>
      <RecommendExperience />
      <SuggestionTrainTicket />
      <Footer />
    </>
  );
};

export default BusPage;