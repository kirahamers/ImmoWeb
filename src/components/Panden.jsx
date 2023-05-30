import React, { useEffect, useState } from "react";
import axios from "axios";

const PandenComponent = () => {
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

  const getPandType = (pand) => {
    const typeNaam = typePanden[pand.typeId];
    return typeNaam || "Onbekend type";
  };

  return (
    <div>
      <h1>Panden</h1>
      {panden.map((pand) => (
        <div key={pand.id}>
          <p>Straat: {pand.straat}</p>
          <p>Huisnummer: {pand.huisnummer}</p>
          <p>Postcode: {pand.postcode}</p>
          <p>Gemeente: {pand.gemeente}</p>
          <p>Prijs: {pand.prijs}</p>
          <p>Soort: {getPandType(pand)}</p>
          {afbeeldingen[pand.id] && (
            <div>
              <p>Afbeeldingen:</p>
              {afbeeldingen[pand.id].map((url) => (
                <img key={url} src={url} alt="Pand afbeelding" />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PandenComponent;
