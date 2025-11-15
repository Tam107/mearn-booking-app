import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import HotelList from '../../components/HotelList/HotelList'

const HotelListPage = () => {
  useEffect(() => {
          window.scrollTo(0, 0);
          
      }
      , []);
  return (
    <>
        <Header/>
        <HotelList/>
    </>
  )
}

export default HotelListPage
