import React from "react";
import "./assets/css/main.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetImage from "./pages/SetImage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/setimage" element={<SetImage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Chat />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
