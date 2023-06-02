import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Filter = ({ applyFilters }) => {

  const [prijsMin, setPrijsMin] = useState('');
  const [prijsMax, setPrijsMax] = useState('');
  const [oppervlakteMin, setOppervlakteMin] = useState('');
  const [oppervlakteMax, setOppervlakteMax] = useState('');
  const [kamersMin, setKamersMin] = useState('');
  const [kamersMax, setKamersMax] = useState('');
  const [locatie, setLocatie] = useState('');

  const handleSearch = () => {
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

    //voeg kamersfilter toe
    if (kamersMin) {
      filters.kamersMin = kamersMin.trim();
    }
    if (kamersMax) {
      filters.kamersMax = kamersMax.trim();
    }
    const locatieFilter = locatie ? (isNaN(locatie) ? locatie.trim().toLowerCase() : Number(locatie)) : '';
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
