import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BsToggleOn } from "react-icons/bs";
import { passwordSettingRoute, profileSettingRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../context/Context";
import axios from "axios";
import LogoutWarning from "./Popups/LogoutWarning";
import CloseAccountWarning from "./Popups/CloseAccountWarning";
import RoundLoader from "../components/Loaders/RoundLoader";

function SettingsContainer({ user, switchTheme }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ispLoading, setIspLoading] = useState(false);
  const [logoutWarn, setLogoutWarn] = useState(false);
  const [accountWarn, setAccountWarn] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const logoutWarnFunction = () => {
    console.log("clicked");
    setLogoutWarn(!logoutWarn);
  };

  const accountWarnFunction = () => {
    setAccountWarn(!accountWarn);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        setIsLoading(true);
        const { data } = await axios.put(`${profileSettingRoute}/${user._id}`, {
          user,
          username,
          email,
          about,
        });
        if (data.status === false) {
          toast.error(data.message, toastOptions);
          setIsLoading(false);
        }
        if (data.status === true) {
          toast.success(
            `${data.message}, You will need to log in again to authorize changes`,
            toastOptions
          );
          setTimeout(() => {
            dispatch({ type: "LOGOUT" });
          }, 3000);
        }
      }
    } catch (error) {
      toast.error(
        "Network Error, Check your network comrade and try again",
        toastOptions
      );
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    if (username === "") {
      toast.error("Provide a valid username", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Boss, you no get email nhi", toastOptions);
      return false;
    } else if (about === "") {
      toast.error("Say something about yourelf comrade", toastOptions);
      return false;
    }
    return true;
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handlePasswordValidation()) {
        setIspLoading(true);
        console.log(password);
        const { data } = await axios.put(
          `${passwordSettingRoute}/${user._id}`,
          {
            password,
            currentPassword,
          }
        );
        if (data.status === false) {
          toast.error(data.message, toastOptions);
          setIspLoading(false);
        }
        if (data.status === true) {
          navigate("/settings");
          toast.success(data.message, toastOptions);
          setIspLoading(false);
        }
      }
    } catch (error) {
      toast.error(
        "Network Error, Check your network comrade and try again",
        toastOptions
      );
      setIspLoading(false);
    }
  };

  const handlePasswordValidation = () => {
    if (currentPassword === "") {
      toast.error(
        "Abeg, Enter the password you were using before",
        toastOptions
      );
      return false;
    } else if (password === "") {
      toast.error("Enter your new password!", toastOptions);
      return false;
    } else if (confirmPassword === "") {
      toast.error(
        "Comrade!, You have to confirm the password na",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Please confirm the password again", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <Container className="settingsContainer">
        <div
          className="body-card tab-pane show active fade"
          id="nav-setting-tab-1"
        >
          <div className="card p-4">
            <div className="border-0 pb-0">
              <h1 className="h5 card-title">Account Settings</h1>
            </div>
            <div className="card-body">
              <form
                className="row g-3"
                onSubmit={(event) => handleSubmit(event)}
              >
                <div className="col-sm-6">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">About</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    defaultValue={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
                <div className="col-12 text-end">
                  {!isLoading ? (
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary mb-0"
                    >
                      Save changes
                    </button>
                  ):(
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary mb-0"
                    >
                      <RoundLoader/>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="card p-4">
            <div className="border-0 pb-0">
              <h5 className="card-title">Change your password</h5>
            </div>
            <div className="card-body">
              <form
                className="row g-3"
                onSubmit={(event) => handlePasswordSubmit(event)}
              >
                <div className="col-12">
                  <label className="form-label">Current password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">New password</label>
                  <input
                    className="form-control fakepassword"
                    type="text"
                    id="psw-input"
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Confirm password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-12 text-end">
                  {!ispLoading ? (
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary mb-0"
                    >
                      Update password
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary mb-0"
                    >
                      <RoundLoader/>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="p-4 col-12 danger-row d-flex justify-content-between">
            <button
              onClick={logoutWarnFunction}
              className="btn btn-primary btn-sm"
            >
              Log Out
              {logoutWarn && <LogoutWarning />}
            </button>
            <button className="btn btn-transparent btn-sm">
              <BsToggleOn onClick={switchTheme} />
            </button>
            <button
              onClick={accountWarnFunction}
              className="btn btn-danger btn-sm"
            >
              Close Account
              {accountWarn && <CloseAccountWarning />}
            </button>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  flex: 0 0 auto;
  width: 93.66666667%;

  .body-card {
    background-color: var(--primary-color);
    height: 100vh;
    overflow: auto;
  }
  .card-title {
    color: var(--secondary-color);
  }
  form {
    label {
      color: var(--faded-secondary-color);
      font-size: 15px;
    }
    .form-control {
      background-color: transparent;
      border: 1px solid var(--faded-secondary-color);
      outline: none;
      color: var(--secondary-color);
      font-size: 15px;
    }
    &:focus {
      border: none;
      outline: none;
    }
    button {
      background: var(--gradient);
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }
  .danger-row {
    button {
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      &:focus {
        outline: none;
        border: none;
      }
      svg {
        color: var(--secondary-color);
        font-size: 30px;
      }
    }
  }
`;

export default SettingsContainer;
