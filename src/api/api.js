import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

export const fetchPanden = async () => {
  try {
    const response = await axios.get("/panden");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAfbeeldingen = async () => {
  try {
    const response = await axios.get("/afbeeldingen");
    const afbeeldingen = response.data.reduce(
      (afbeeldingenPerPand, afbeelding) => {
        const pandId = afbeelding.pandId;
        if (!afbeeldingenPerPand[pandId]) {
          afbeeldingenPerPand[pandId] = [];
        }
        afbeeldingenPerPand[pandId].push(afbeelding.url);
        return afbeeldingenPerPand;
      },
      {}
    );
    return afbeeldingen;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchTypePanden = async () => {
  try {
    const response = await fetch("/typepanden");
    const typepanden = await response.json();
    return typepanden;
  } catch (error) {
    console.error("Fout bij het ophalen van typepanden:", error);
  }
};

export const fetchRegio = async () => {
  try {
    const response = await fetch("/regio");
    const regios = await response.json();
    return regios;
  } catch (error) {
    console.error("Fout bij het ophalen van regios:", error);
  }
};
