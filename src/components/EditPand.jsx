import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationAdmin from "./NavigationAdmin";

const EditPand = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [straat, setStraat] = useState("");
  const [huisnummer, setHuisnummer] = useState("");
  const [bus, setBus] = useState("");
  const [postcode, setPostcode] = useState("");
  const [gemeente, setGemeente] = useState("");
  const [prijs, setPrijs] = useState("");
  const [oppervlakte, setOppervlakte] = useState("");
  const [aantalKamers, setAantalKamers] = useState("");
  const [beschrijving, setBeschrijving] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [regio, setRegio] = useState({ id: "" });
  const [type, setType] = useState({ id: "" }); 
  const [regioOptions, setRegioOptions] = useState([]);
  const [typePanden, setTypePanden] = useState([]);
  const [afbeeldingen, setAfbeeldingen] = useState([]);

  useEffect(() => {
    fetchPand();
    fetchTypePanden();
  }, []);

  const fetchPand = async () => {
    try {
      const response = await axios.get(`/panden/${id}`);
      const pand = response.data;
      setStraat(pand.straat);
      setHuisnummer(pand.huisnummer);
      setBus(pand.bus);
      setPostcode(pand.postcode);
      setGemeente(pand.gemeente);
      setPrijs(pand.prijs);
      setOppervlakte(pand.oppervlakte);
      setAantalKamers(pand.aantalKamers);
      setBeschrijving(pand.beschrijving);
      setRegio({ id: pand.regioId });
      setType({ id: pand.typeId });
  
      fetchAfbeeldingen(pand);
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchAfbeeldingen = async (huisData) => {
    if (huisData) {
      try {
        const response = await axios.get(`/afbeeldingen`);
        const images = response.data.filter((image) => image.pandId === huisData.id);
        if (images.length > 0) {
          const firstImage = images[0]; // Assuming you want to set the first image URL
          setFotoUrl(firstImage.url);
        }
        setAfbeeldingen(images);
      } catch (error) {
        console.error(error);
      }
    }
  };  

  useEffect(() => {
    fetchTypePanden();
  }, []);

  const fetchTypePanden = async () => {
    try {
      const response = await fetch('/typepanden');
      const data = await response.json();
      setTypePanden(data);
    } catch (error) {
      console.error('Fout bij het ophalen van typepanden:', error);
    }
  };

  const handleTypeChange = (event) => {
    const selectedTypeId = parseInt(event.target.value);
    const selectedType = typePanden.find((typePand) => typePand.id === selectedTypeId);
    setType(selectedType); // Set the selectedType object directly
  };  

  useEffect(() => {
    fetchRegio();
  }, []);
  
  const fetchRegio = async () => {
    try {
      const response = await fetch('/regio');
      const data = await response.json();
      setRegioOptions(data);
    } catch (error) {
      console.error('Fout bij het ophalen van regios:', error);
    }
  };
  
  const handleRegioChange = (event) => {
  const selectedRegioId = parseInt(event.target.value);
  const selectedRegio = regioOptions.find((regioOption) => regioOption.id === selectedRegioId);
  setRegio({ id: selectedRegioId }); // Update to store as object with ID
};


  const handleButtonClick = async () => {
    try {
        console.log(regio.id)
        console.log(type.id)
      const updatedPand = {
        straat,
        huisnummer,
        bus,
        postcode,
        gemeente,
        prijs,
        oppervlakte,
        aantalKamers,
        beschrijving,
        regioId: regio.id,
        typeId: type.id,
      };

      await axios.put(`/panden/${id}`, updatedPand);

      navigate(`/admin/huizen/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostcodeChange = (event) => {
    const { value } = event.target;
    setPostcode(value);
  };

  const handlePrijsChange = (event) => {
    const { value } = event.target;
    setPrijs(value);
  };

  const handleOppervlakteChange = (event) => {
    const { value } = event.target;
    setOppervlakte(value);
  };

  const handleAantalKamersChange = (event) => {
    const { value } = event.target;
    setAantalKamers(value);
  };

  const handleFotoUrlChange = (event) => {
    const { value } = event.target;
    setFotoUrl(value);
  };

  return (
    <>
      <NavigationAdmin />
      <div className="ml-10 mt-3">
        <h4 className="body-font font-poppins fw-bold">Pand bewerken</h4>
        <p></p>
        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Straat</p> &nbsp;
          <input
            className="border rounded-lg"
            size="100"
            type="text"
            value={straat}
            onChange={(event) => setStraat(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Huisnummer</p> &nbsp;
          <input
            className="border rounded-lg"
            size="10"
            type="text"
            value={huisnummer}
            onChange={(event) => setHuisnummer(event.target.value)}
          />
          &nbsp;
          <p className="body-font font-poppins fw-bold mt-3">Bus</p> &nbsp;
          <input
            className="border rounded-lg"
            size="10"
            type="text"
            value={bus}
            onChange={(event) => setBus(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Postcode</p> &nbsp;
          <input
            className="border rounded-lg"
            size="10"
            type="text"
            value={postcode}
            onChange={handlePostcodeChange}
          />
          &nbsp;
          <p className="body-font font-poppins fw-bold mt-3">Gemeente</p> &nbsp;
          <input
            className="border rounded-lg"
            size="20"
            type="text"
            value={gemeente}
            onChange={(event) => setGemeente(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Regio</p> &nbsp;
          <select
            className="border rounded-lg"
            value={regio.id}
            onChange={handleRegioChange}
            >
            <option value="">Selecteer een regio</option>
            {regioOptions.map((regioOption) => (
                <option key={regioOption.id} value={regioOption.id}>
                {regioOption.naam}
                </option>
            ))}
            </select>
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Prijs</p> &nbsp;
          <input
            className="border rounded-lg"
            type="text"
            value={prijs}
            onChange={handlePrijsChange}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Oppervlakte</p> &nbsp;
          <input
            className="border rounded-lg"
            type="text"
            value={oppervlakte}
            onChange={handleOppervlakteChange}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Type</p> &nbsp;
          <select
            className="border rounded-lg"
            value={type.id}
            onChange={handleTypeChange}
            >
            <option value="">Selecteer een type</option>
            {typePanden.map((typePand) => (
                <option key={typePand.id} value={typePand.id}>
                {typePand.naam}
                </option>
            ))}
            </select>


        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Aantal kamers</p> &nbsp;
          <input
            className="border rounded-lg"
            size="2"
            type="text"
            value={aantalKamers}
            onChange={handleAantalKamersChange}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Beschrijving</p> &nbsp;
          <textarea
            className="border rounded-lg"
            rows="4"
            cols="100"
            value={beschrijving}
            onChange={(event) => setBeschrijving(event.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="body-font font-poppins fw-bold mt-3">Foto URL</p> &nbsp;
          <input
            type="text"
            className="border rounded-lg"
            size="100"
            name="fotoUrl"
            value={fotoUrl}
            onChange={handleFotoUrlChange}
          />
        </div>

        {fotoUrl && (
          <div className="form-group">
            <p className="body-font font-poppins fw-bold mt-3">Preview</p>

            <img src={fotoUrl} alt="Pand" style={{ maxWidth: "400px" }} />

          </div>
        )}
      </div>

      <div className="form-group">
        <button className="px-4 text-white bg-red-600 rounded-full ml-7" onClick={handleButtonClick}>
          Update
        </button>
      </div>
    </>
  );
};

export default EditPand;
