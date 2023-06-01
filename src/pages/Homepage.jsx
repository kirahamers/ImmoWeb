import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Filter from '../components/Filter';
import { add } from '../store/favorites/slice';
import { useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from "axios";
import Navigation from '../components/Navigation';

const Homepage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filters = Object.fromEntries(queryParams.entries());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState([]);
  const [locatieFilter, setLocatieFilter] = useState(filters.locatie || '');
  const [prevLocatieFilter, setPrevLocatieFilter] = useState(filters.locatie || '');
  const [allePanden, setAllePanden] = useState([]);
  const [panden, setPanden] = useState([]);
  const [typePanden, setTypePanden] = useState({});
  const [afbeeldingen, setAfbeeldingen] = useState({});

  const handleHeartClick = (event, h) => {
    console.log('Favorites before click:', favorites);
    console.log('Huis before click:', h);
    event.preventDefault();
    event.stopPropagation();

    if (favorites.includes(h.id)) {
      const updatedFavorites = favorites.filter((id) => id !== h.id);
      updateFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, h.id];
      updateFavorites(updatedFavorites);
      dispatch(add(h));
    }
  };

  const updateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchPanden();
    fetchTypePanden();
    fetchAfbeeldingen();
  }, []);

  const fetchPanden = async () => {
    try {
      const response = await axios.get("/panden");
      setPanden(response.data);
      setAllePanden(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Filters toepassen wanneer locatie verandert
    applyFilters({ ...filters, locatie: locatieFilter });
  }, [locatieFilter]);

  const fetchTypePanden = async () => {
    try {
      const response = await axios.get("/typepanden");
      const types = response.data.reduce((acc, type) => {
        acc[type.id] = type.naam;
        return acc;
      }, {});
      setTypePanden(types);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAfbeeldingen = async () => {
    try {
      const response = await axios.get("/afbeeldingen");
      const images = response.data.reduce((acc, image) => {
        const pandId = image.pandId;
        if (!acc[pandId]) {
          acc[pandId] = [];
        }
        acc[pandId].push(image.url);
        return acc;
      }, {});
      setAfbeeldingen(images);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = (filters) => {
    const gefilterdePanden = allePanden.filter((pand) => {
      if (filters.prijsMin && pand.prijs < filters.prijsMin) {
        return false;
      }
      if (filters.prijsMax && pand.prijs > filters.prijsMax) {
        return false;
      }
      if (filters.oppervlakteMin && pand.oppervlakte < filters.oppervlakteMin) {
        return false;
      }
      if (filters.oppervlakteMax && pand.oppervlakte > filters.oppervlakteMax) {
        return false;
      }
      if (filters.kamersMin && pand.aantalKamers < filters.kamersMin) {
        return false;
      }
      if (filters.kamersMax && pand.aantalKamers > filters.kamersMax) {
        return false;
      }
      if (filters.locatie) {
        const locatieFilter = filters.locatie;
        const gemeente = pand.gemeente.toLowerCase();
        const postcode = pand.postcode.toString();
  
        if (!gemeente.includes(locatieFilter) && !postcode.includes(locatieFilter)) {
          return false;
        }        
      }
      return true;
    });
  
    setPanden(gefilterdePanden);
  };

  const handleSearch = (searchFilters) => {
    // Herstel de lijst met panden en pas de filters toe
    setLocatieFilter(searchFilters.locatie || '');
    applyFilters(searchFilters);
  };

  return (
    <>
      <Navigation />
      <Filter applyFilters={handleSearch} />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
          {panden.map((pand) => (
            <div
              onClick={() => navigate(`/huizen/${pand.id}`)}
              key={pand.id}
              className="relative w-full h-auto flex flex-col justify-between overflow-clip align-middle rounded-md shadow-md cursor-pointer"
            >
              {afbeeldingen[pand.id] && (
                <img
                  className="w-full h-3/4 object-cover"
                  src={afbeeldingen[pand.id][0]} // Gebruik de eerste afbeelding van het pand
                  alt="Pand afbeelding"
                />
              )}
              <p className="font-semibold text-center">{pand.beschrijving}</p>
              <p className="text-center -mt-3 text-gray-400">{pand.gemeente}, €{pand.prijs}</p>
              {pand.IsVerkochtVerhuurd && (
                <p className="absolute top-2 right-2 text-red-700 bg-black font-semibold rounded-full"> VERKOCHT/VERHUURD! </p>
              )}
              <button
                onClick={(event) => handleHeartClick(event, pand)}
                className="absolute bottom-2 right-2"
              >
                {favorites.includes(pand.id) ? (
                  <AiFillHeart color="red" size={22} />
                ) : (
                  <AiOutlineHeart color="red" size={22} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
