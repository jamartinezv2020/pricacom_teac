// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definir el estado inicial
interface AuthState {
  isAuthenticated: boolean;
  user: { name: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

// Crear el slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Exportar las acciones para usarlas en los componentes
export const { login, logout } = authSlice.actions;

// Exportar el reducer para agregarlo al store
export default authSlice.reducer;
