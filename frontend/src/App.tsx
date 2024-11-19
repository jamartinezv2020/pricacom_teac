// src/App.tsx
import React from "react";
import "./App.css";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <div className="App">
      <h1>Mi aplicación con Redux</h1>
      <UserInfo />
    </div>
  );
}

export default App;
