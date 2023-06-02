import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminFilter from '../components/AdminFilter';
import NavigationAdmin from '../components/NavigationAdmin';

const Adminpage = () => {
  const navigate = useNavigate();

  const [panden, setPanden] = useState([]);
  const [afbeeldingen, setAfbeeldingen] = useState({});

  useEffect(() => {
    fetchPanden();
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

  return (
    <>
      <NavigationAdmin></NavigationAdmin>
      <AdminFilter></AdminFilter>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
          {panden.map((pand) => (
            <div
              onClick={() => navigate(`/adminhuizen/${pand.id}`)}
              key={pand.id}
              className="relative w-full h-auto flex flex-col justify-between overflow-clip align-middle rounded-md shadow-md cursor-pointer"
            >
              {afbeeldingen[pand.id] && (
                <img
                  className="w-full h-full object-cover"
                  src={afbeeldingen[pand.id][0]}
                  alt="Pand afbeelding"
                />
              )}
              <p className="font-semibold text-center">{pand.beschrijving}</p>
              <p className="text-center -mt-3 text-gray-400">{pand.gemeente}, €{pand.prijs}</p>
              {pand.IsVerkochtVerhuurd && (
                <p className="absolute top-2 right-2 text-red-700 bg-black font-semibold rounded-full"> VERKOCHT/VERHUURD! </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
                }  

export default Adminpage;