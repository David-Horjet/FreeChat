import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../context/Context";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import logo from "../assets/images/logo.png";
import RoundLoader from "../components/Loaders/RoundLoader";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const { dispatch, isFetching } = useContext(Context);
  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    document.title = "Login - FreeChat";
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        dispatch({ type: "LOGIN_START" });
        const { password, username } = values;
        const res = await axios.post(loginRoute, {
          username,
          password,
        });
        if (res.data.status === false) {
          toast.error(res.data.message, toastOptions);
          isFetching(false);
        }
        if (res.data.status === true) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
          localStorage.setItem("token", JSON.stringify(res.data.token));
          toast.success(res.data.message, toastOptions);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      if(error.response.data.message) {
        toast.error(error.response.data.message, toastOptions);
      } else if (error.message) {
        toast.error(error.response.data.message, toastOptions);
      } else {
        toast.error("Internal server error occured", toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (username === "") {
      toast.error("Username is required", toastOptions);
      isFetching(false);
      return false;
    } else if (password === "") {
      toast.error("Passord is required", toastOptions);
      isFetching(false);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="logo d-flex align-items-center">
            <img src={logo} alt="logo" />
            <h1 className="mb-0">
              Free<span>Chat</span>
            </h1>
          </div>
          <div className="descrip">
            <p className="pt-2 text-center">Welcome back buddy 😃</p>
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Horjet"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {isFetching ? (
            <button type="submit" disabled>
              <RoundLoader/>
            </button>
          ) : (
            <button type="submit">Log in</button>
          )}
          <span>
            Don't have an account ? <Link to={"/register"}>Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--faded-primary-color);
  justify-content: center;
  overflow-y: auto;

  @media (max-width: 992px) {
    form {
      height: 100%;
      width: 100%;
      padding: 2rem 1.5rem !important;
    }
  }
  
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 35px;
    }
    h1 {
      color: var(--secondary-color);
      font-size: 25px;
      span {
        color: var(--color);
      font-size: 25px;
      }
    }
  }
  .descrip p {
    color: var(--faded-secondary-color);
  }
  form {
    display: flex;
    flex-direction: column;
    background: var(--primary-color);
    border-radius: 10px;
    padding: 2rem 3rem;
    label {
      color: var(--faded-secondary-color);
      margin-bottom: 5px;
      font-size: 16px;
    }
    input {
      background: var(--faded-primary-color);
      padding: 0.7rem;
      margin-bottom: 15px;
      border: none;
      outline: none;
      border-radius: 0.4rem;
      color: var(--secondary-color);
      width: 100%;
      font-size: 0.8rem;
    }
    &:focus {
      border: none;
      outline: none;
    }
    button {
      background: var(--gradient);
      color: white;
      padding: 10px 0;
      margin: 10px 0;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      transition: 0.3s all;
      &:hover {
        background: #4e0eff;
      }
      &:disabled {
        cursor: not-allowed;
        background: #946dff;
      }
    }
    span {
      color: var(--secondary-color);
      font-size: 15px;
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default Login;
