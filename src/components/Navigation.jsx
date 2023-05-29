import "./Navigation.css";
import React, { useState } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
    <header className='bg-black'>
        <nav className='flex flex-row justify-between p-4'>
            <div className='text-white body-font font-poppins mt-2 text-xl'>
                WebImmo
            </div>
            <div className="flex space-x-1"> 
            <Link to="/">
            <button className="px-4 text-red-700 mt-2 body-font font-poppins">Home</button>
            </Link>
            <Link to="/login">
            <button className="px-4 text-red-500 mt-2 body-font font-poppins">LogIn</button>
            </Link>
            <Link to="/typepanden">
            <button className="px-4 text-red-500 mt-2 body-font font-poppins">TypePanden</button>
            </Link>
            <input
                    type="text"
                    className="block w-full px-4 py-2 text-red-700 bg-white border rounded-full focus:border-red-500 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Vul een stad, postcode of prijs in..."
                />
                <button className="px-4 text-white bg-red-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    </header>
    
</>
  )
}


export default Navigation