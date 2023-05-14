import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import Form from 'react-bootstrap/Form';
import './AdminFilter.css';
import { Link } from 'react-router-dom';

const AdminFilter = () => {
  return (
    <header className='bg-red-700 d-flex flex-row'>
        <nav className='flex flex-row justify-between p-1'>
          <Link to="/addpand">
        <button className="btn px-4  rounded-full ">
                    Voeg pand toe
                </button>
                </Link>
                
        </nav>
    </header>
  )
}

export default AdminFilter