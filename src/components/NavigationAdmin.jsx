import React from 'react';
import { Link } from 'react-router-dom';

const NavigationAdmin = () => {
  return (
    <>
    <header className='bg-black'>
        <nav className='flex flex-row justify-between p-4'>
            <div className='text-white body-font font-poppins mt-2 text-xl'>
                WebImmo.Admin
            </div>
            <div className="flex space-x-1"> 
            <Link to="/admin">
            <button className="px-4 text-red-700 mt-2 body-font font-poppins">Home</button>
            </Link>
            <Link to="/logout">
            <button className="px-4 text-red-400 mt-2 body-font font-poppins">LogOut</button>
            </Link>
            </div>
        </nav>
    </header>
    
</>
  )
}

export default NavigationAdmin