import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { remove } from "../store/favorites/slice";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [afbeeldingen, setAfbeeldingen] = useState({});

  const favoritesState = useSelector((storeState) => storeState.favorites);

  useEffect(() => {
    fetchAfbeeldingen();
  }, []);

  const verwijderClick = (event, h) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Favorites before removal:', favoritesState);
    dispatch(remove(h.id));
    console.log('Favorites after removal:', favoritesState);
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
      console.log("Fetched afbeeldingen:", images);
      setAfbeeldingen(images);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Favorites state:", favoritesState);

  return (
    <>
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
        {favoritesState.map((h) => (
          <div
            onClick={() => navigate(`/huizen/${h.id}`)}
            key={h.id}
            className="relative w-full h-auto flex flex-col justify-between overflow-clip align-middle rounded-md shadow-md cursor-pointer"
          >
            {afbeeldingen[h.id] && (
              <img
                className="w-full h-3/4 object-cover"
                src={afbeeldingen[h.id][0]}
                alt="Pand afbeelding"
              />
            )}
            <p className="font-semibold text-center">{h.beschrijving}</p>
            <p className="text-center -mt-3 text-gray-400">
              {h.gemeente}, €{h.prijs}
            </p>
            <button onClick={(event) => verwijderClick(event, h)}>
              Verwijder
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;
