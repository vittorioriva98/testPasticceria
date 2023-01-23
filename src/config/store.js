import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { productsReducer, userReducer, toastReducer } from "../services/reducers";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage/session";

const reducers = combineReducers({
  user: userReducer,
  products: productsReducer,
  toast: toastReducer
});

const persistConfig = {
  timeout: 1,
  key: "pasticceria",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
