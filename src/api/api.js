import axios from 'axios';

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
    const afbeeldingen = response.data.reduce((afbeeldingenPerPand, afbeelding) => {
      const pandId = afbeelding.pandId;
      if (!afbeeldingenPerPand[pandId]) {
        afbeeldingenPerPand[pandId] = [];
      }
      afbeeldingenPerPand[pandId].push(afbeelding.url);
      return afbeeldingenPerPand;
    }, {});
    return afbeeldingen;
  } catch (error) {
    console.error(error);
    return null;
  }
};