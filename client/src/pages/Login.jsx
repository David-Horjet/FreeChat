import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { DiSenchatouch } from "react-icons/di";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    document.title = "Login - FreeChat"
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        setIsLoading(true);
        const { password, username } = values;
        console.log({password, username});
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
          setIsLoading(false);
        }
        if (data.status === true) {
          localStorage.setItem("User", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Network Error, Check your network connection and try again", toastOptions);
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Passord is required", toastOptions);
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
          <div className="logo">
            <DiSenchatouch />
            <h1>
              Free<span>Chat</span>
            </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {!isLoading && <button type="submit">Log in</button>}
          {isLoading && (
            <button disabled type="submit">
              Finding Account...
            </button>
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
  gap: 1rem;
  align-items: center;
  background-color: var(--faded-primary-color);
  justify-content: center;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: var(--color);
      font-size: 25px;
    }
    h1 {
      color: var(--secondary-color);
      font-size: 25px;
      span {
        color: var(--color);
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: var(--primary-color);
    border-radius: 10px;
    padding: 2rem 3rem;
    input {
      background: var(--faded-primary-color);
      padding: 0.6rem;
      border: 0.1rem solid #d9d8d8;
      border-radius: 0.4rem;
      color: var(--secondary-color);
      width: 100%;
      font-size: 1rem;
    }
    &:focus {
      border: none;
    }
    button {
      background: var(--gradient);
      color: white;
      padding: 1rem 1.5rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: var(--secondary-color);
      a {
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: none;
      }
    }
  }
`;

export default Login;
