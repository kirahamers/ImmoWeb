import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add: (state, action) => {
      const foundIndex = state.findIndex((h) => h.id === action.payload.id);

      if (foundIndex === -1) {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      console.log("Favorites before removal:", state);

      const filteredFavorites = state.filter(
        (favorite) => favorite.id !== action.payload
      );
      console.log("Filtered favorites:", filteredFavorites);

      return filteredFavorites;
    },

    clear: (state, action) => {
      state.favorites = [];
    },
    updateAfbeeldingen: (state, action) => {
      state.afbeeldingen = action.payload;
    },
  },
});

export const { reducer } = favoritesSlice;
export const { add, remove, updateAfbeeldingen } = favoritesSlice.actions;

export default favoritesSlice.reducer;
