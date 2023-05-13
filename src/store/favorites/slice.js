import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  // number, string, arrays, objecten,...
  initialState: [],
  name: "favorites",
  reducers: {
    add: (state, action) => {
      const foundIndex = state.findIndex(
        (stateHuis) => stateHuis.id === action.payload.id
      );

      if (foundIndex === -1) {
        // mutable door IMMER package
        state.push(action.payload);
      }
      //return [...state, action.payload];
    },
    remove: (state, action) => {
      //TODO: implementeer remove
      const newArray = state.filter(
        (stateHuis) => stateHuis.id !== action.payload
      );
      return newArray;
    },
    clear: (state, action) => {
      return [];
    },
  },
});

export const { reducer } = favoritesSlice;
export const { add, remove } = favoritesSlice.actions;
