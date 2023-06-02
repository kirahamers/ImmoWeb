import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../components/NavigationAdmin';
import "../components/AddPand.css"
import { useNavigate } from 'react-router-dom';

const AddPand = () => {
  const [type, setType] = useState('');
  const [regioOptions, setRegioOptions] = useState([]);
  const [typePanden, setTypePanden] = useState([]);
  const [regio, setRegio] = useState('');
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

  const navigate = useNavigate();

  const postcodeChange = (event) => {
    const postcode = parseInt(event.target.value);
    setPostcode(postcode);
  };
  
  const oppervlakteChange = (event) => {
    const oppervlakte = parseInt(event.target.value);
    setOppervlakte(oppervlakte);
  };
  
  const prijsChange = (event) => {
    const prijs = parseInt(event.target.value);
    setPrijs(prijs);
  };
  
  const aantalKamersChange = (event) => {
    const aantalKamers = parseInt(event.target.value);
    setAantalKamers(aantalKamers);
  };
  
  const typeChange = (event) => {
    const selectedType = typePanden.find((typePand) => typePand.id === parseInt(event.target.value));
    setType(selectedType);
  };

  const regioChange = (event) => {
    const selectedRegio = regioOptions.find((regioOption) => regioOption.id === parseInt(event.target.value));
    setRegio(selectedRegio);
  };

useEffect(() => {
  const fetchData = async () => {
    await Promise.all([fetchTypePanden(), fetchRegio()]);
  };

  fetchData();
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

  const fetchRegio = async () => {
    try {
      const response = await fetch('/regio');
      const data = await response.json();
      setRegioOptions(data);
    } catch (error) {
      console.error('Fout bij het ophalen van regios:', error);
    }
  };
  

  const handleButtonClick = async () => {
    if (
      !straat ||
      !huisnummer ||
      !postcode ||
      !gemeente ||
      !type ||
      !regio ||
      !prijs ||
      !aantalKamers ||
      !oppervlakte ||
      !beschrijving ||
      !fotoUrl
    ) {
      window.alert('Niet alle vereiste velden zijn ingevuld.');
      return;
    }

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
      typeId: type.id,
      regioId: regio.id,
      fotoUrl,
    };

    try {
      //maak het nieuwe pand aan
      const response = await fetch('/panden', {
        method: 'POST',
        //aangeven dat het meegegeven object een json object is
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPand),
      });

      if (response.ok) {
        //haal het aangemaakte pand op uit de respons
        const aangemaaktePand = await response.json();

        //maak een nieuw afbeeldingsobject aan adhv juist aangemaakte pand
        const newAfbeelding = {
          url: fotoUrl,
          pandId: aangemaaktePand.id,
        };

        await createAfbeelding(newAfbeelding);

        console.log('Nieuw pand is aangemaakt:', aangemaaktePand);
        navigate(-1);
      } else {
        console.error('Fout bij het aanmaken van het nieuwe pand:', response.status);
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van het nieuwe pand:', error);
    }
  };

  const createAfbeelding = async (newAfbeelding) => {
    try {
      const response = await fetch('/afbeeldingen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAfbeelding),
      });

      if (response.ok) {
        console.log('Nieuwe afbeelding is aangemaakt:', newAfbeelding);
      } else {
        console.error('Fout bij het aanmaken van de nieuwe afbeelding:', response.status);
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van de nieuwe afbeelding:', error);
    }
  };

  return (
    <>
      <NavigationAdmin />
      <div className='ml-10 mt-3'>
        <h4 className="body-font font-poppins fw-bold">Pand toevoegen</h4>
        <p></p>
        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Straat</p> <span className="required">*</span> &nbsp;
          <input
            className='border rounded-lg'
            size="100"
            type="text"
            value={straat}
            onChange={(event) => setStraat(event.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Huisnummer</p> <span className="required">*</span> &nbsp;
          <input
            className='border rounded-lg'
            size="10"
            type="text"
            value={huisnummer}
            onChange={(event) => setHuisnummer(event.target.value)}
            required
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
          <p className="body-font font-poppins fw-bold mt-3">Postcode</p> <span className="required">*</span>&nbsp;
          <input
            className='border rounded-lg'
            size="10"
            type="text"
            value={postcode}
            onChange={postcodeChange}
            required
          />
          &nbsp;
          <p className="body-font font-poppins fw-bold mt-3">Gemeente</p> <span className="required">*</span>&nbsp;
          <input
            className='border rounded-lg'
            size="20"
            type="text"
            value={gemeente}
            onChange={(event) => setGemeente(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
        <p className="body-font font-poppins fw-bold mt-3">Regio</p> <span className="required">*</span>&nbsp;
        <select
          className="border rounded-lg"
          value={regio ? regio.id : ''}
          onChange={regioChange}
          required
        >
          <option value="">Selecteer een regio</option>
          {regioOptions.map((regioOption) => (
            <option key={regioOption.id} value={regioOption.id}>
              {regioOption.naam}
            </option>
          ))}
        </select>
      </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Prijs</p> <span className="required">*</span>&nbsp;
          <input
           className='border rounded-lg'
            type="text"
            value={prijs}
            onChange={prijsChange}
            required
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Oppervlakte</p> <span className="required">*</span>&nbsp;
          <input
            className='border rounded-lg'
            type="text"
            value={oppervlakte}
            onChange={oppervlakteChange}
            required
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Type</p> <span className="required">*</span>&nbsp;
          <select
            className='border rounded-lg'
            value={type ? type.id : ''}
            onChange={typeChange}
            required
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
          <p className="body-font font-poppins fw-bold mt-3">Aantal kamers</p> <span className="required">*</span>&nbsp;
          <input
            className='border rounded-lg'
            size="2"
            type="text"
            value={aantalKamers}
            onChange={aantalKamersChange}
            required
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Beschrijving</p><span className="required">*</span> &nbsp;
          <textarea
            className='border rounded-lg'
            rows="4"
            cols="100"
            value={beschrijving}
            onChange={(event) => setBeschrijving(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Foto URL</p> <span className="required">*</span>&nbsp;
          <input
            type="text"
            className="border rounded-lg"
            size="100"
            value={fotoUrl}
            onChange={(event) => setFotoUrl(event.target.value)}
            required
          />
        </div>

        {fotoUrl && (
          <div className="form-group">
            <p className="body-font font-poppins fw-bold mt-3">Preview</p> &nbsp;

            <img src={fotoUrl} alt="Pand" style={{ maxWidth: "400px" }} />

          </div>
        )}

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
