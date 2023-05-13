import React from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import "./AddPand.css"

const AddPand = () => {
  return (
    <div className='ml-10 mt-3'>
    <h4 className="body-font font-poppins fw-bold">Pand toevoegen</h4>
        <p></p>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Titel</p> &nbsp;
        <input className='border rounded-lg' size="100" type="text" />
        </div>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Prijs</p> &nbsp;
        <input class="inputbig" className='border rounded-lg' type="text" /> &nbsp;
        <p className="body-font font-poppins mt-3 ml-2">verhuren</p> &nbsp;
        <input type="checkbox"/>
        </div>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Oppervlakte</p> &nbsp;
        <input class="inputbig" className='border rounded-lg' type="text" />
        </div>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Aantal badkamers</p> &nbsp;
        <input class="inputbig" className='border rounded-lg' size="2" type="text" /> &nbsp;
        <p className="body-font font-poppins fw-bold mt-3">Aantal slaapkamers</p> &nbsp;
        <input class="inputbig" className='border rounded-lg' size="2"type="text" />
        </div>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Beschrijving</p> &nbsp;
        <textarea class="inputbig" className='border rounded-lg' rows="4" cols="100"/>
        </div>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Contact</p> &nbsp;
        <input class="inputbig" className='border rounded-lg' size='50' type="text" />
        </div>
        <div class="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Foto</p> &nbsp;
        <input type="file" id="uploadButton" />
        </div>

<p></p>
        <div class="form-group">
        <Link>
        <button className="px-4 text-white bg-red-600 rounded-full " onclick="document.getElementById('uploadButton').click()">Upload</button>
        </Link>
        </div>


        </div>
  )
}

export default AddPand