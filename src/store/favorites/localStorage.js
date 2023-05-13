export const loadState = () => {
  try {
    const serializedState = /*window.*/ localStorage.getItem("state");

    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Fout in het laden van de state.");
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (error) {
    console.log("Fout in het opslaan van de state");
  }
};
