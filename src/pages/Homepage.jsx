import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Filter from '../components/Filter';
import { add } from '../store/favorites/slice';
import { useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from "axios";
import Navigation from '../components/Navigation';

const Homepage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState([]);
  const [allePanden, setAllePanden] = useState([]);
  const [panden, setPanden] = useState([]);
  const [afbeeldingen, setAfbeeldingen] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPanden(), fetchAfbeeldingen()]);
    };
    fetchData();
  }, []);

  const handleHeartClick = (event, pand) => {
    //zodat je niet naar de detailpagina gaat
    event.preventDefault();
    event.stopPropagation();

    if (favorites.includes(pand.id)) {
      const updatedFavorites = favorites.filter((id) => id !== pand.id);
      updateFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, pand.id];
      updateFavorites(updatedFavorites);
      //redux add
      dispatch(add(pand));
    }
  };

  const updateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };


  const fetchPanden = async () => {
    try {
      const response = await axios.get("/panden");
      setPanden(response.data);
      setAllePanden(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAfbeeldingen = async () => {
    try {
      const response = await axios.get("/afbeeldingen");
      //accumulator -> soort dictionary
      const afbeeldingen = response.data.reduce((afbeeldingenPerPand, afbeelding) => {
        const pandId = afbeelding.pandId;
        if (!afbeeldingenPerPand[pandId]) {
          afbeeldingenPerPand[pandId] = [];
        }
        afbeeldingenPerPand[pandId].push(afbeelding.url);
        return afbeeldingenPerPand;
      }, {});
      setAfbeeldingen(afbeeldingen);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = (filters) => {
    const gefilterdePanden = allePanden.filter((pand) => {
      //als er een filter is, maar het pand niet voldoet aan het filter, return false
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

  const handleSearch = (zoekFilters) => {
    applyFilters(zoekFilters);
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
