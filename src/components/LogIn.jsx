import React from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const LogIn = () => {
  return (
    <>
<Navigation/>
<div className='text-center mt-4'>
        <h4 className="body-font font-poppins fw-bold">Log in:</h4>
        <p></p>
        <p className="body-font font-poppins fw-bold">Email:</p>
        <input className='border-2 border-red-700 rounded-lg' type="text" />
        <p> </p>
        <p className="body-font font-poppins fw-bold">Wachtwoord:</p>
        <input className='border-2 border-red-700 rounded-lg' type="password" />
        <p> </p>
        <Link to="/admin">
        <button className="px-4 text-white bg-red-600 rounded-full ">
                    Ok
                </button>
        </Link>
        </div>
        </>
  )
}

export default LogIn