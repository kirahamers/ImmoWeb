import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import { add } from '../store/favorites/slice';
import { useDispatch } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

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

  return (
    <>
      <Filter></Filter>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
          {huizenData.panden.map((h) => (
            <div
              onClick={() => navigate(`/huizen/${h.id}`)}
              key={h.id}
              className="relative w-full h-auto flex flex-col justify-between overflow-clip align-middle rounded-md shadow-md cursor-pointer"
            >
              <img
                className="w-full h-3/4 object-cover"
                src={h.afbeelding}
                alt={h.beschrijving}
              />
              <p className="font-semibold text-center">{h.beschrijving}</p>
              <p className="text-center -mt-3 text-gray-400">{h.gemeente}, €{h.prijs}</p>
              <button
                onClick={(event) => handleHeartClick(event, h)}
                className="absolute bottom-2 right-2"
              >
                  <AiOutlineHeart color="red" size={22} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;