import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationAdmin from "../components/NavigationAdmin";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminHuisDetailPage = () => {
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
  
  const fetchAfbeeldingen = async (huisData) => {
    if (huisData) {
      try {
        const response = await axios.get(`/afbeeldingen`);
        const images = response.data.filter((image) => image.pandId === huisData.id);
        setAfbeeldingen(images);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const fetchRegio = async (data) => {
    try {
      const response = await axios.get(`/regio/${data.regioId}`);
      setRegio(response.data.naam);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPandType = async (data) => {
    try {
      const response = await axios.get(`/typepanden/${data.typeId}`);
      setPandType(response.data.naam);
    } catch (error) {
      console.error(error);
    }
  };

  // door foreign key constraint moeten eerst de afbeeldingen verwijderd worden
  const handleDelete = async () => {
    const confirmation = window.confirm("Ben je zeker dat je het pand wilt verwijderen?");
    if (confirmation) {
      try {
        await deleteAfbeeldingen(huis.id); // Verwijder de afbeeldingen met het juiste pandId
        await axios.delete(`/panden/${id}`);
        navigate(-1);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const deleteAfbeeldingen = async (pandId) => {
    try {
      console.log(pandId);
      await axios.delete(`/afbeeldingen/pand/${pandId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  if (!huis) {
    return <div>Loading...</div>;
  }
  

  return (
    <>
      <NavigationAdmin />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl mb-4 text-red-700">{huis.beschrijving}</h1>
        {afbeeldingen.length > 0 && (
          <img
            className="w-70 h-64 rounded mb-4"
            src={afbeeldingen[0].url} // Gebruik de eerste afbeelding van het pand
            alt={huis.beschrijving}
          />
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
        <Link to={`/admin/huizen/${id}/bewerken`} className="btn px-4 rounded-full">
          Bewerk pand
        </Link>
        &nbsp;
        <button className="btn px-4 rounded-full" onClick={handleDelete}>
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
