// src/components/landing/LandingPage.jsx
import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import Navbar from '../navbar/Navbar';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#f0f7ff]">
            <Navbar />

            {/* Hero Section with adjusted margin-top */}
            <div className="pt-24">
                <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">
                            Life's an <span className="text-blue-600">adventure</span>, live it!
                        </h1>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            We help travelers find accommodations, plan relaxing vacations and embark on exciting adventures.
                            Whether you're creating, checking off, or completing your list, we can help you find vacation.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4">
                        <div className="flex items-center flex-1">
                            <MapPin className="text-orange-500 mr-2" />
                            <div>
                                <div className="text-xs text-gray-500">Location</div>
                                <div>Choose destinations</div>
                            </div>
                        </div>
                        <div className="flex items-center flex-1">
                            <Calendar className="text-orange-500 mr-2" />
                            <div>
                                <div className="text-xs text-gray-500">Date</div>
                                <div>January 16, 2024</div>
                            </div>
                        </div>
                        <div className="flex items-center flex-1">
                            <Search className="text-orange-500 mr-2" />
                            <div>
                                <div className="text-xs text-gray-500">Category</div>
                                <div>Restaurant</div>
                            </div>
                        </div>
                        <div className="flex items-center flex-1">
                            <Users className="text-orange-500 mr-2" />
                            <div>
                                <div className="text-xs text-gray-500">Amount of guests</div>
                                <div>2 adults, 2 children</div>
                            </div>
                        </div>
                        <button className="bg-orange-500 p-3 rounded-lg">
                            <Search className="text-white" />
                        </button>
                    </div>

                    {/* Categories */}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;