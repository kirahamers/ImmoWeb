import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";

const HuisDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [huis, setHuis] = useState(null);
  const [afbeeldingen, setAfbeeldingen] = useState([]);
  const [pandType, setPandType] = useState("");
  const [regio, setRegio] = useState("");


  useEffect(() => {
    fetchHuis();
    fetchAfbeeldingen();
  }, []);

  const fetchHuis = async () => {
    try {

      const response = await axios.get(`/panden/${id}`);
      setHuis(response.data);
      fetchPandType(response.data);
      fetchRegio(response.data);
      fetchAfbeeldingen(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchAfbeeldingen = async (pand) => {
    if (pand) {
      try {
        const response = await axios.get(`/afbeeldingen`);
        const images = response.data.filter((image) => image.pandId === pand.id);
        setAfbeeldingen(images);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchRegio = async (pand) => {
    try {
      const response = await axios.get(`/regio/${pand.regioId}`);
      setRegio(response.data.naam);
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchPandType = async (pand) => {
    try {
      const response = await axios.get(`/typepanden/${pand.typeId}`);
      setPandType(response.data.naam);
    } catch (error) {
      console.error(error);
    }
  };

  if (!huis) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navigation />
    <div className="flex flex-col items-center mt-8">
    <h1 className="text-2xl mb-4 text-red-700"> {huis.beschrijving}</h1>
      {afbeeldingen.length > 0 && (
        <img
          className="w-70 h-64 rounded mb-4"
          src={afbeeldingen[0].url} // Gebruik de eerste afbeelding van het pand
          alt={huis.beschrijving}
        />
      )}
      {huis.IsVerkochtVerhuurd && (
                <p className="text-red-700 font-semibold rounded-full"> DIT PAND IS VERKOCHT/VERHUURD </p>
              )}
      <p>
          <strong>Regio:</strong> {regio}
      </p>
        <p>
          <strong>Straat:</strong> {huis.straat}
        </p>
        <p>
          <strong>Huisnummer:</strong> {huis.huisnummer}
        </p>
        <p>
          <strong>Bus:</strong> {huis.bus}
        </p>
        <p>
          <strong>Postcode:</strong> {huis.postcode}
        </p>
      <p>
          <strong>Gemeente:</strong> {huis.gemeente}
        </p>
        <p>
          <strong>Prijs:</strong> €{huis.prijs}
        </p>
        <p>
          <strong>Type:</strong> {pandType}
        </p>
        <p>
          <strong>Aantal kamers:</strong> {huis.aantalKamers}
        </p>
        <p>
          <strong>Oppervlakte:</strong> {huis.oppervlakte} m²
        </p>
        <p>
          <strong>Beschrijving:</strong> {huis.beschrijving}
        </p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mt-4 bg-red-700 text-white rounded hover:bg-red-800"
      >
        Terug
      </button>
    </div>
    </>
  );
};

export default HuisDetailPage;
