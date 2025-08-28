import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import HeroBus from '../../components/Hero/HeroBus'
import BusForm from './BusForm'
import RecommendExperience from '../../components/RecommendExperience/RecommendExperience'
import SuggestionTrainTicket from '../../components/SuggestionTrainTicket/SuggestionTrainTicket'
import Footer from '../../components/Footer/Footer'
const BusPage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>
        <Header/>
        <HeroBus/>
        <BusForm />
        <RecommendExperience/>
      <SuggestionTrainTicket/>
        <Footer/>
    </>
  )
}

export default BusPage
