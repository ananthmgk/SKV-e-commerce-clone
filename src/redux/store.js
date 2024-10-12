import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistStore, persistReducer } from "redux-persist"; // this is to save the data even after refreshed..
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);
