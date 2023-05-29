import React, { useEffect, useState } from "react";
import axios from "axios";

const TypePandenComponent = () => {
  const [typePanden, setTypePanden] = useState([]);

  useEffect(() => {
    fetchTypePanden();
  }, []);

  const fetchTypePanden = async () => {
    try {
      const response = await axios.get("/typepanden");
      setTypePanden(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Type Panden</h1>
      {typePanden.map((typePand) => (
        <div key={typePand.id}>
          <p>Naam: {typePand.naam}</p>
        </div>
      ))}
    </div>
  );
};

export default TypePandenComponent;
