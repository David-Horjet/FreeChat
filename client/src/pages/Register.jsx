import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import logo from "../assets/images/logo2.png";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "error",
  };

  useEffect(() => {
    document.title = "Register - FreeChat";
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        setIsLoading(true);
        const { password, username, email } = values;
        console.log({ password, username, email });
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        console.log(data);
        if (data.status === false) {
          toast.error(data.message, toastOptions);
          setIsLoading(false);
        }
        if (data.status === true) {
          localStorage.setItem("User", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/setimage");
        }
      }
    } catch (error) {
      toast.error(
        "Network Error, Check your network connection and try again",
        toastOptions
      );
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm password should be thesame",
        toastOptions
      );
      return false;
    } else if (username.length < 4) {
      toast.error("Username should be greater than 4 characters", toastOptions);
      return false;
    } else if (password.length < 4) {
      toast.error("Password should be equal or greater than 4", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
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
            <img src={logo} alt="logo" />
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
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          {!isLoading && <button type="submit">Create Account</button>}
          {isLoading && (
            <button disabled type="submit">
              Creating Account...
            </button>
          )}
          <span>
            Already have an account ? <Link to={"/login"}>Login</Link>
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
    img {
      width: 50px;
    }
    h1 {
      color: var(--secondary-color);
      font-size: 30px;
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
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: var(--secondary-color);
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default Register;
