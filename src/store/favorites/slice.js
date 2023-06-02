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
      const filteredFavorites = state.filter(
        (favorite) => favorite.id !== action.payload
      );

      return filteredFavorites;
    },
    clear: (state, action) => {
      state.favorites = [];
    },
  },
});

export const { reducer } = favoritesSlice;
export const { add, remove } = favoritesSlice.actions;

export default favoritesSlice.reducer;
