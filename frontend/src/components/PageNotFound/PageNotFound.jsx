import React from 'react'
import { Link } from 'react-router'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const PageNotFound = () => {
  return (
    <>
<Header/>  
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400">
      <div className="text-center text-white px-6 py-12 bg-opacity-70 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-9xl font-extrabold tracking-wide mb-6">404</h1>
        <p className="text-2xl font-semibold mb-4">Oops! Page not found</p>
        <p className="text-lg mb-6">The page you're looking for does not exist or has been moved.</p>
        <a href="/" className="inline-block px-8 py-3 bg-white text-gray-800 text-lg font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300">
          Go Back Home
        </a>
      </div>
    </div>

  
     <Footer/>
    
    </>
   
  )
}

export default PageNotFound
