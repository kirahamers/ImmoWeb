import React, { useState, useEffect } from 'react';
import "./AddPand.css";
import NavigationAdmin from './NavigationAdmin';

const AddPand = () => {
  const [type, setType] = useState('');
  const [typePanden, setTypePanden] = useState([]);
  const [regio, setRegio] = useState([]);
  const [straat, setStraat] = useState('');
  const [huisnummer, setHuisnummer] = useState('');
  const [bus, setBus] = useState('');
  const [postcode, setPostcode] = useState('');
  const [gemeente, setGemeente] = useState('');
  const [prijs, setPrijs] = useState('');
  const [aantalKamers, setAantalKamers] = useState('');
  const [oppervlakte, setOppervlakte] = useState('');
  const [beschrijving, setBeschrijving] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  useEffect(() => {
    fetchTypePanden();
  }, []);

  const fetchTypePanden = async () => {
    try {
      const response = await fetch('/typepanden');
      const data = await response.json();
      setTypePanden(data);
    } catch (error) {
      console.error('Fout bij het ophalen van typepanden:', error);
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    fetchRegio();
  }, []);
  
  const fetchRegio = async () => {
    try {
      const response = await fetch('/regio');
      const data = await response.json();
      setRegio(data);
    } catch (error) {
      console.error('Fout bij het ophalen van regios:', error);
    }
  };
  
  const handleRegioChange = (event) => {
    setRegio(event.target.value);
  };

  const handleButtonClick = () => {
    const newPand = {
      straat,
      huisnummer,
      bus,
      postcode,
      gemeente,
      prijs,
      aantalKamers,
      oppervlakte,
      beschrijving,
      typeId: type,
      regioId: regio,
      fotoUrl,
    };

    createPand(newPand);
  };

  const createPand = async (newPand) => {
    try {
      const response = await fetch('/panden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPand),
      });

      if (response.ok) {
        // Het nieuwe pand is succesvol aangemaakt
        console.log('Nieuw pand is aangemaakt:', newPand);
      } else {
        console.error('Fout bij het aanmaken van het nieuwe pand:', response.status);
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van het nieuwe pand:', error);
    }
  };

  return (
    <>
      <NavigationAdmin />
      <div className='ml-10 mt-3'>
        <h4 className="body-font font-poppins fw-bold">Pand toevoegen</h4>
        <p></p>
        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Straat</p> &nbsp;
          <input
            className='border rounded-lg'
            size="100"
            type="text"
            value={straat}
            onChange={(event) => setStraat(event.target.value)}
          />
        </div>
        
        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Huisnummer</p> &nbsp;
          <input
            className='border rounded-lg'
            size="10"
            type="text"
            value={huisnummer}
            onChange={(event) => setHuisnummer(event.target.value)}
          />
          &nbsp;
          <p className="body-font font-poppins fw-bold mt-3">Bus</p> &nbsp;
          <input
            className='border rounded-lg'
            size="10"
            type="text"
            value={bus}
            onChange={(event) => setBus(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Postcode</p> &nbsp;
          <input
            className='border rounded-lg'
            size="10"
            type="text"
            value={postcode}
            onChange={(event) => setPostcode(event.target.value)}
          />
          &nbsp;
          <p className="body-font font-poppins fw-bold mt-3">Gemeente</p> &nbsp;
          <input
            className='border rounded-lg'
            size="20"
            type="text"
            value={gemeente}
            onChange={(event) => setGemeente(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Regio</p> &nbsp;
          <select
            className='border rounded-lg'
            value={regio}
            onChange={handleRegioChange}
          >
            <option value=''>Selecteer een regio</option>
            {typePanden.map((regio) => (
              <option key={regio.id} value={regio.id}>
                {regio.naam}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Prijs</p> &nbsp;
          <input
            className='border rounded-lg'
            type="text"
            value={prijs}
            onChange={(event) => setPrijs(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Oppervlakte</p> &nbsp;
          <input
            className='border rounded-lg'
            type="text"
            value={oppervlakte}
            onChange={(event) => setOppervlakte(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Type</p> &nbsp;
          <select
            className='border rounded-lg'
            value={type}
            onChange={handleTypeChange}
          >
            <option value=''>Selecteer een type</option>
            {typePanden.map((typePand) => (
              <option key={typePand.id} value={typePand.id}>
                {typePand.naam}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Aantal kamers</p> &nbsp;
          <input
            className='border rounded-lg'
            size="2"
            type="text"
            value={aantalKamers}
            onChange={(event) => setAantalKamers(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Beschrijving</p> &nbsp;
          <textarea
            className='border rounded-lg'
            rows="4"
            cols="100"
            value={beschrijving}
            onChange={(event) => setBeschrijving(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Foto URL</p> &nbsp;
          <input
            type="text"
            className="border rounded-lg"
            size="100"
            value={fotoUrl}
            onChange={(event) => setFotoUrl(event.target.value)}
          />
        </div>

        <p></p>

        <div className="form-group">
          <button
            className="px-4 text-white bg-red-600 rounded-full"
            onClick={handleButtonClick}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPand;
