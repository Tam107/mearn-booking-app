import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import RecommendExperience from '../../components/RecommendExperience/RecommendExperience'
import RecommendPlaces from '../../components/RecommendPlaces/RecommendPlaces'
import SuggestionTrainTicket from '../../components/SuggestionTrainTicket/SuggestionTrainTicket'
import TravelGuide from '../../components/TravelGuide/TravelGuide'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'

const HomePage = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }
  , []);
  return (
    <>
      
      <Header/>
      <Hero/>
      <RecommendPlaces/>
      <RecommendExperience/>
      <SuggestionTrainTicket/>
        <Footer/>
      

    </>
  )
}

export default HomePage