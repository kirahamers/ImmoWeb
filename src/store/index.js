import { configureStore } from "@reduxjs/toolkit";
import { reducer as favoritesReducer } from "./favorites/slice";
import { combineReducers } from "@reduxjs/toolkit";
import { loadState, saveState } from "./favorites/localStorage";
import { throttle } from "lodash";

//combineren van ozne reducers
const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

//opvragen van de state uit onze localStorage
const loadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  //onze state die we in de localstorage hadden staan meegeven aan onze store
  preloadedState: loadedState,
});

store.subscribe(throttle(() => saveState(store.getState()), 1000));
