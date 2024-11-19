// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  nombre_usuario: string | null;
  email: string | null;
  autenticado: boolean;
}

const initialState: UserState = {
  id: null,
  nombre_usuario: null,
  email: null,
  autenticado: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.nombre_usuario = action.payload.nombre_usuario;
      state.email = action.payload.email;
      state.autenticado = true;
    },
    logout: (state) => {
      state.id = null;
      state.nombre_usuario = null;
      state.email = null;
      state.autenticado = false;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
