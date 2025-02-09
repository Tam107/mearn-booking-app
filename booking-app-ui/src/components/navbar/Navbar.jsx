import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search, MapPin, Calendar, Users } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-3">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Traveling Website
          </span>
                </a>

                <div className="flex md:order-2 items-center space-x-3">
                    <button
                        type="button"
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-700"
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        {isMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <div
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } items-center justify-between w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <div className="w-full md:w-auto overflow-x-auto">
                        <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {[
                                'Train Ticket',
                                'Bus Ticket',
                                'Hotel',
                                'Halong Bay Cruises',
                                'Food Tour',
                                'Package Tour',
                                'Hot deal'
                            ].map((item) => (
                                <li key={item} className="md:px-4">
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;