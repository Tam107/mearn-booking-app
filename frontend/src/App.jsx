import { useState } from 'react'
import { Routes,Route} from "react-router-dom";

import './App.css'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HotelDetailPage from './pages/HotelDetailPage/HotelDetailPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/hotel/:slug" element={<HotelDetailPage/>}/>
      </Routes>
      
    </>
  )
}

export default App
