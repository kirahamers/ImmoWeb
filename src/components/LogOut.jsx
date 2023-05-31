import React from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from 'react-router-dom';
import NavigationAdmin from './NavigationAdmin';

const LogOut = () => {
  return (
    <>
    <NavigationAdmin/>
    <div className='text-center mt-20'>
        <h4 className="body-font font-poppins fw-bold">Melding:</h4>
        <p className="body-font font-poppins fw-bold">U bent succesvol uitgelogd.</p>
        <Link to="/">
        <button className="px-4 text-white bg-red-600 rounded-full ">
                    Ok
                </button>
        </Link>
        </div>
        </>
  )
}

export default LogOut