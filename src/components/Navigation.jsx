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
            </div>
        </nav>
    </header>
    
</>
  )
}


export default Navigation