// src/components/UserInfo.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Asegúrate de que esta línea esté correcta
import { login, logout } from "../redux/authSlice";

const UserInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = () => {
    dispatch(login({ name: "Juan Pérez" })); // Simulación de un login
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Bienvenido, {user?.name}!</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h2>No estás autenticado</h2>
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
