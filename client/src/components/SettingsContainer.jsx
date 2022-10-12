import React, { useState } from "react";
import styled from "styled-components";
import { passwordSettingRoute, profileSettingRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SettingsContainer({ currentUser }) {
  console.log(currentUser);
  const navigate = useNavigate();

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [about, setAbout] = useState(currentUser.about);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ispLoading, setIspLoading] = useState(false);
  console.log(username);

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        setIsLoading(true);
        const { data } = await axios.post(profileSettingRoute, {
          username,
          email,
          about
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
          setIsLoading(false);
        }
        if (data.status === true) {
          localStorage.setItem("User", JSON.stringify(data.user));
          navigate("/settings");
        }
      }
    } catch (error) {
      toast.error("Network Error, Check your network comrade and try again", toastOptions);
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
        const { data } = await axios.post(passwordSettingRoute, {
          password
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
          setIspLoading(false);
        }
        if (data.status === true) {
          navigate("/settings");
        }
      }
    } catch (error) {
      toast.error("Network Error, Check your network comrade and try again", toastOptions);
      setIspLoading(false);
    }
  };

  const handlePasswordValidation = () => {
    if (currentPassword === "") {
      toast.error("Abeg, Enter the password you were using before", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Enter your new password!", toastOptions);
      return false;
    } else if (confirmPassword === "") {
      toast.error("Comrade!, You have to confirm the password na", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Please confirm the password again", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <Container className="col-lg-11 col-xxl-11">
        <div
          className="body-card tab-pane show active fade"
          id="nav-setting-tab-1"
        >
          <div className="card p-4">
            <div className="border-0 pb-0">
              <h1 className="h5 card-title">Account Settings</h1>
            </div>
            <div className="card-body">
              <form className="row g-3" onSubmit={(event) => handleSubmit(event)}>
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
                  {!isLoading && 
                  <button type="submit" className="btn btn-sm btn-primary mb-0">
                  Save changes
                </button>
                  }
                  {isLoading && 
                  <button type="submit" className="btn btn-sm btn-primary mb-0">
                  Saving......
                </button>
                  }
                </div>
              </form>
            </div>
          </div>
          <div className="card p-4">
            <div className="border-0 pb-0">
              <h5 className="card-title">Change your password</h5>
            </div>
            <div className="card-body">
              <form className="row g-3" onSubmit={(event) => handlePasswordSubmit(event)}>
                <div className="col-12">
                  <label className="form-label">Current password</label>
                  <input type="text" className="form-control" placeholder="Current password" 
                    onChange={(e) => setCurrentPassword(e.target.value)} />
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
                  <input type="text" className="form-control" placeholder="Confirm Password" 
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="col-12 text-end">
                  {!ispLoading && 
                  <button type="submit" className="btn btn-sm btn-primary mb-0">
                  Update password
                </button>
                  }
                  {ispLoading && 
                  <button type="submit" className="btn btn-sm btn-primary mb-0">
                  Updating........
                </button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  .body-card {
    background-color: var(--primary-color);
    height: 100vh;
    overflow: auto;
  }
  .card-title {
    color: var(--secondary-color);
  }
  label {
    color: var(--faded-secondary-color);
  }
  .form-control {
    background-color: transparent;
    border: 1px solid var(--faded-secondary-color);
    outline: none;
    color: var(--secondary-color);
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
`;

export default SettingsContainer;
