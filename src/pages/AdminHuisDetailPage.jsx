import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationAdmin from "../components/NavigationAdmin";

const huizenData = require("../utils/huizen.json");

const AdminHuisDetailPage = () => {
  const { id } = useParams();
  const huis = huizenData.panden.find((h) => h.id === parseInt(id));

  const navigate = useNavigate();

  //  TODO: Recept uit die recepten array uit te halen met die id

  return (
    <>
    <NavigationAdmin></NavigationAdmin>
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl mb-4 text-red-700">House {huis.id}</h1>
      <img src={huis.afbeelding} alt={huis.beschrijving} className="w-70 h-64 rounded mb-4" />
      <p><strong>Gemeente:</strong> {huis.gemeente}</p>
      <p><strong>Prijs:</strong> €{huis.prijs}</p>
      <p><strong>Type:</strong> {huis.type}</p>
      <p><strong>Aantal kamers:</strong> {huis.aantalkamers}</p>
      <p><strong>Oppervlakte:</strong> {huis.oppervlakte} m²</p>
      <p><strong>Beschrijving:</strong> {huis.beschrijving}</p>
      <button className="btn px-4  rounded-full ">
                    Bewerk pand
                </button>
                &nbsp;
                <button className="btn px-4 rounded-full ">
                    Verwijder pand
                </button>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mt-4 bg-gray-400 text-white rounded hover:bg-red-800"
      >
        Terug
      </button>

    </div>
    </>
  );
};

export default AdminHuisDetailPage;