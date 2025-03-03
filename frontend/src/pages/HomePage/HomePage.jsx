import React from 'react'
import Header from '../../components/Header/Header'
import RecommendExperience from '../../components/RecommendExperience/RecommendExperience'
import RecommendPlaces from '../../components/RecommendPlaces/RecommendPlaces'
import SuggestionTrainTicket from '../../components/SuggestionTrainTicket/SuggestionTrainTicket'
import TravelGuide from '../../components/TravelGuide/TravelGuide'
import Hero from '../../components/Hero/Hero'

const HomePage = () => {
  return (
    <>
      
      <Header/>
      <Hero/>
      <RecommendPlaces/>
      <RecommendExperience/>
      <SuggestionTrainTicket/>
      <TravelGuide/>
      <div className='w-full h-[1px] bg-[#E5E7EB] shadow'></div>
      

    </>
  )
}

export default HomePage