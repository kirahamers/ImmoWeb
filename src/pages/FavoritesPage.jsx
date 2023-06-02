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

  const verwijderClick = (event, pand) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(remove(pand.id));
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

  console.log("Favorites state:", favoritesState);

  return (
    <>
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
        {favoritesState.map((pand) => (
          <div
            onClick={() => navigate(`/huizen/${pand.id}`)}
            key={pand.id}
            className="relative w-full h-auto flex flex-col justify-between overflow-clip align-middle rounded-md shadow-md cursor-pointer"
          >
            {afbeeldingen[pand.id] && (
              <img
                className="w-full h-3/4 object-cover"
                src={afbeeldingen[pand.id][0]}
                alt="Pand afbeelding"
              />
            )}
            <p className="font-semibold text-center">{pand.beschrijving}</p>
            <p className="text-center -mt-3 text-gray-400">
              {pand.gemeente}, €{pand.prijs}
            </p>
            {pand.IsVerkochtVerhuurd && (
                <p className="absolute top-2 right-2 text-black bg-red-700 font-semibold rounded-full"> VERKOCHT/VERHUURD! </p>
              )}
            <button onClick={(event) => verwijderClick(event, pand)}>
              Verwijder
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;
