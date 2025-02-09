// src/components/search/Search.jsx
import React from 'react';
import { Search as SearchIcon, MapPin, Calendar, Users } from 'lucide-react';

const Search = () => {
    return (
        <div className=" bg-white p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4">
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
                <SearchIcon className="text-orange-500 mr-2" />
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
                <SearchIcon className="text-white" />
            </button>
        </div>
    );
};

export default Search;