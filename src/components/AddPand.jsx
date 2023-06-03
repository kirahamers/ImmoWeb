import React, { useState, useEffect } from 'react';
import "./AddPand.css";
import NavigationAdmin from './NavigationAdmin';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

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

  const validatieSchema = Yup.object().shape({
    straat: Yup.string().required('Straat is verplicht'),
    huisnummer: Yup.string()
      .matches(/^[0-9]{4,}$/, 'Huisnummer moet minimaal 4 cijfers zijn')
      .required('Huisnummer is verplicht'),
    postcode: Yup.number().required('Postcode is verplicht'),
    gemeente: Yup.string().required('Gemeente is verplicht'),
    regio: Yup.object().shape({
      id: Yup.string().required('Regio is verplicht'),
    }),
    prijs: Yup.number().required('Prijs is verplicht'),
    oppervlakte: Yup.number().required('Oppervlakte is verplicht'),
    type: Yup.object().shape({
      id: Yup.string().required('Type is verplicht'),
    }),
    aantalKamers: Yup.number().required('Aantal kamers is verplicht'),
    beschrijving: Yup.string().required('Beschrijving is verplicht'),
    fotoUrl: Yup.string().required('Foto URL is verplicht'),
  });

  const navigate = useNavigate();

  const handlePostcodeChange = (event) => {
    const parsedPostcode = parseInt(event.target.value);
    setPostcode(parsedPostcode);
  };
  
  const handleOppervlakteChange = (event) => {
    const parsedOppervlakte = parseInt(event.target.value);
    setOppervlakte(parsedOppervlakte);
  };
  
  const handlePrijsChange = (event) => {
    const parsedPrijs = parseInt(event.target.value);
    setPrijs(parsedPrijs);
  };
  
  const handleAantalKamersChange = (event) => {
    const parsedAantalKamers = parseInt(event.target.value);
    setAantalKamers(parsedAantalKamers);
  };
  
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
    const selectedType = typePanden.find((typePand) => typePand.id === parseInt(event.target.value));
    setType(selectedType);
  };

  useEffect(() => {
    fetchRegio();
  }, []);
  
  const fetchRegio = async () => {
    try {
      const response = await fetch('/regio');
      const data = await response.json();
      setRegioOptions(data);
    } catch (error) {
      console.error('Fout bij het ophalen van regios:', error);
    }
  };
  
  const handleRegioChange = (event) => {
    const selectedRegio = regioOptions.find((regioOption) => regioOption.id === parseInt(event.target.value));
    setRegio(selectedRegio);
  };

  const handleButtonClick = async () => {
   try {
    await validatieSchema.validate({
      straat,
      huisnummer,
      postcode,
      gemeente,
      regio,
      prijs,
      aantalKamers,
      oppervlakte,
      type,
      beschrijving,
      fotoUrl,
    });

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
      const response = fetch('/panden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPand),
      });

      if (response.ok) {
        //haal het aangemaakte pand op uit de respons
        const createdPand = response.json();

        //maak een nieuw afbeeldingsobject aan
        const newAfbeelding = {
          url: fotoUrl,
          pandId: createdPand.id, //gebruik de ID van het juist aangemaakte pand
        };

        //stuur het nieuwe afbeeldingsobject naar de server
        createAfbeelding(newAfbeelding);

        console.log('Nieuw pand is aangemaakt:', createdPand);
        navigate(-1);
      } else {
        console.error('Fout bij het aanmaken van het nieuwe pand:', response.status);
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van het nieuwe pand:', error);
    }
  } catch (error) {
    console.error('Fout bij het valideren van het formulier:', error);
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
            type="number"
            value={postcode}
            onChange={handlePostcodeChange}
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
          onChange={handleRegioChange}
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
            type="number"
            value={prijs}
            onChange={handlePrijsChange}
            required
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Oppervlakte</p> <span className="required">*</span>&nbsp;
          <input
            className='border rounded-lg'
            type="number"
            value={oppervlakte}
            onChange={handleOppervlakteChange}
            required
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Type</p> <span className="required">*</span>&nbsp;
          <select
            className='border rounded-lg'
            value={type ? type.id : ''}
            onChange={handleTypeChange}
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
            type="numbers"
            value={aantalKamers}
            onChange={handleAantalKamersChange}
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
