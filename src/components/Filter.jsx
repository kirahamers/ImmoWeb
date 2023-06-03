import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchTypePanden, fetchRegio } from '../api/api';

const Filter = ({ applyFilters }) => {

  const [prijsMin, setPrijsMin] = useState('');
  const [prijsMax, setPrijsMax] = useState('');
  const [oppervlakteMin, setOppervlakteMin] = useState('');
  const [oppervlakteMax, setOppervlakteMax] = useState('');
  const [kamersMin, setKamersMin] = useState('');
  const [kamersMax, setKamersMax] = useState('');
  const [regios, setRegios] = useState([]);
  const [typePanden, setTypePanden] = useState([]);
  const [regio, setRegio] = useState('');
  const [type, setType] = useState('');
  const [locatie, setLocatie] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const types = await fetchTypePanden();
      const regios = await fetchRegio();
      setRegios(regios);
      setTypePanden(types);
    };
  
    fetchData();
  }, []);

  const regioChange = (event) => {
    const selectedRegioId = parseInt(event.target.value);
    const selectedRegio = regios.find((regios) => regios.id === selectedRegioId);
    setRegio(selectedRegio);
  };
  
    const typeChange = (event) => {
      const selectedTypeId = parseInt(event.target.value);
      const selectedType = typePanden.find((typePand) => typePand.id === selectedTypeId);
      setType(selectedType);
    };  
  

  const handleSearch = () => {
    //maak een lege filters array aan waar alle voorwaarden inzitten
    const filters = {};

    //voeg prijsfilter toe
    if (prijsMin) {
      filters.prijsMin = prijsMin.trim();
    }
    if (prijsMax) {
      filters.prijsMax = prijsMax.trim();
    }

    //voeg oppervlaktefilter toe
    if (oppervlakteMin) {
      filters.oppervlakteMin = oppervlakteMin.trim();
    }
    if (oppervlakteMax) {
      filters.oppervlakteMax = oppervlakteMax.trim();
    }

    //voeg kamerfilter toe
    if (kamersMin) {
      filters.kamersMin = kamersMin.trim();
    }
    if (kamersMax) {
      filters.kamersMax = kamersMax.trim();
    }

    if(type){
      filters.type = type;
    }

    if(regio){
      filters.regio = regio;
    }

    //voeg locatiefilter toe -> string of int?
    const locatieFilter = locatie ? locatie.trim().toLowerCase() : '';
    if (locatie) {
      filters.locatie = locatieFilter;
    }
    //roep de applyFilters-functie uit de homepage component aan om de filters toe te passen
    applyFilters(filters);
  };

  return (
    <header className="bg-red-700 d-flex flex-row">
    <nav className="flex flex-row justify-between p-1">
      <div className="flex space-x-4 text-white body-font font-poppins mt-2 h-10">
          Filter: &nbsp;
        </div>
        <div className="form-group">
        <select
          className="bg-black text-white h-10 -mt-2.5 rounded-lg focus:outline-none"
          value={type ? type.id : ''}
          onChange={typeChange}
          required
        >
          <option value="">Selecteer een type</option>
          {typePanden.map((typePand) => (
            <option key={typePand.id} value={typePand.id}>
              {typePand.naam}
            </option>
          ))}
        </select>
      </div>
      &nbsp;

              &nbsp;
        <Dropdown className="border-left-0 ">
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Prijs
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Min €"
              value={prijsMin}
              onChange={(e) => setPrijsMin(e.target.value)}
            />
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Max €"
              value={prijsMax}
              onChange={(e) => setPrijsMax(e.target.value)}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Oppervlakte
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Min m²"
              value={oppervlakteMin}
              onChange={(e) => setOppervlakteMin(e.target.value)}
            />
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Max m²"
              value={oppervlakteMax}
              onChange={(e) => setOppervlakteMax(e.target.value)}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Aantal kamers
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Min kamers"
              value={kamersMin}
              onChange={(e) => setKamersMin(e.target.value)}
            />
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Max kamers"
              value={kamersMax}
              onChange={(e) => setKamersMax(e.target.value)}
            />
          </Dropdown.Menu>
        </Dropdown>
        &nbsp;
      <div className="form-group">
        <select
          className="bg-black text-white h-10 -mt-2.5 rounded-lg focus:outline-none"
          value={regio.id}
          onChange={regioChange}
        >
          <option value="">Selecteer een regio</option>
          {regios.map((regio) => (
            <option key={regio.id} value={regio.id}>
              {regio.naam}
            </option>
          ))}
        </select>
      </div>
      &nbsp;
        <div className="flex-grow" />
        <div className="flex space-x-1">
        <input
                    type="text"
                    className="block w-full px-4 py-2 text-red-700 bg-white border rounded-full focus:border-red-500 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 h-10"
                    placeholder="Vul een stad, postcode in"
                    value={locatie}
                    onChange={(e) => setLocatie(e.target.value)}
                />
                </div>
                <div className="flex space-x-1">
                <button onClick={handleSearch} className="px-4 text-white bg-black rounded-full h-10 ml-auto">
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
            <div className="flex grow"/>
        <Link
          to="/favorites"
          className="body-font mt-2 px-4 text-white rounded-full ml-3 favorieten"
        >
          Favorieten
        </Link>
      </nav>
    </header>
  );
};

export default Filter;
