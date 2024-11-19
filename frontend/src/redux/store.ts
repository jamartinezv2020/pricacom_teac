// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Crear el store de Redux
const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

// Exportar el tipo RootState para que pueda ser usado en el useSelector
export type RootState = ReturnType<typeof store.getState>;

export default store;
