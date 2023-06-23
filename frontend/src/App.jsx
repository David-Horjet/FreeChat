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
  const { token } = useContext(Context);
  const [theme, setTheme] = ueLocalStorage("theme" ? "dark" : "dark");

  const switchTheme = () => {
    const newTheme = theme === "theme" ? "dark" : "dark";
    setTheme(newTheme);
  };

  return (
    <>
      <div className="app" data-theme={"dark"}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={token  ? <Chat /> : <Register />} />
            <Route
              path="/setimage"
              element={token ? <SetImage /> : <Login />}
            />
            <Route path="/login" element={token ? <Chat /> : <Login />} />
            <Route
              path="/settings"
              element={
                token ? <Settings switchTheme={switchTheme} /> : <Login />
              }
            />
            <Route
              path="/:username"
              element={token ? <Profile /> : <Login />}
            />
            <Route exact path="/" element={token ? <Chat /> : <Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
