import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { remove } from "../store/favorites/slice";
import { useNavigate } from 'react-router-dom';


const FavoritesPage = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redux store aanspreken
  //opvragen van data uit onze redux store gebeurd via UseSelector hook
  //volledige stor opvragen
  //const state = useSelector(storeState => storeState);
  const verwijderClick = (event, h) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(remove(h.id));
  };

  const favoritesState = useSelector(storeState => storeState.favorites);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
    {favoritesState.map((h) => 
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
      <button onClick={(event) => verwijderClick(event, h)}>Verwijder</button>
    </div>)}
    </div>
  )
};

export default FavoritesPage;