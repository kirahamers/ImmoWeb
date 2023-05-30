import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import { add } from '../store/favorites/slice';
import { useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from "axios";

const huizenData = require('../utils/huizen.json');

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState([]);

  const handleHeartClick = (event, h) => {
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

  const [panden, setPanden] = useState([]);
  const [typePanden, setTypePanden] = useState({});
  const [afbeeldingen, setAfbeeldingen] = useState({});

  useEffect(() => {
    fetchPanden();
    fetchTypePanden();
    fetchAfbeeldingen();
  }, []);

  const fetchPanden = async () => {
    try {
      const response = await axios.get("/panden");
      setPanden(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <>
      <Filter></Filter>
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
                }  

export default Homepage;