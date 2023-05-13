import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Filter = () => {
  return (
    <header className="bg-red-700 d-flex flex-row">
      <nav className="flex flex-row justify-between p-1">
        <div className="flex space-x-4 text-white body-font font-poppins mt-2">
          Filter op: &nbsp;
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
            />
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Max €"
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
            />
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Max m²"
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
            />
            <Form.Control
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Max kamers"
            />
          </Dropdown.Menu>
        </Dropdown>
        <button className="btn px-4 text-white bg-black rounded-full ml-5">
          Zoek
        </button>
        <Link
            to="/favorites"
            className="body-font mt-1.5 px-4 text-white rounded-full ml-3 favorieten">
            Favorieten
          </Link>
      </nav>
    </header>
  );
};

export default Filter;