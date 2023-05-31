import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { loadState, saveState } from "./favorites/localStorage";
import { throttle } from "lodash";
import favoritesReducer from "./favorites/slice";

// Combineren van onze reducers
const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

// Opvragen van de state uit onze localStorage
const loadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  // Onze state die we in de localstorage hadden staan meegeven aan onze store
  preloadedState: loadedState,
});

// Abonneer op store wijzigingen en gebruik throttling om het opslaan van de state te beperken
store.subscribe(
  throttle(() => {
    saveState(store.getState().favorites); // Alleen de favorieten opslaan in de local storage
  }, 1000)
);

export default store;
