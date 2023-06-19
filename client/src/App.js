import React, { useContext } from "react";
import "./assets/css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetImage from "./pages/SetImage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { Context } from "./context/Context";
import PageNotFound from "./pages/PageNotFound";
import ueLocalStorage from "use-local-storage";


function App() {
  const {user} = useContext(Context);
  const [theme, setTheme] = ueLocalStorage("theme" ? "dark" : "light");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <div className="app" data-theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={user ? <Chat /> : <Register/>} />
            <Route path="/setimage" element={user ? <SetImage /> :<Login />} />
            <Route path="/login" element={user ? <Chat /> : <Login/>} />
            <Route path="/settings" element={user ? <Settings switchTheme={switchTheme} /> : <Login/>} />
            <Route path="/:username" element={user ? <Profile /> : <Login/>} />
            <Route path="/" element={user ? <Chat /> : <Login/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
