import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setImageRoute } from "../utils/APIRoutes";
import { BsPersonCircle } from "react-icons/bs";
import { DiSenchatouch } from "react-icons/di";
import { Context } from "../context/Context";
import RoundLoader from "../components/Loaders/RoundLoader";

function SetImage() {
  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", data: "" });
  const inputRef = useRef(null);
  const [about, setAbout] = useState("");

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    document.title = "Set Profile Picture - FreeChat";
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        dispatch({ type: "LOGIN_START" });
        let formData = new FormData();
        if (image.data) {
          formData.append("image", image.data);
          formData.append("about", about);
          console.log(formData);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          const response = await axios.post(
            `${setImageRoute}/${user._id}`,
            formData,
            config
          );
          if (response.data.status === true) {
            toast.success(`${response.data.msg}, Sorry you will need to login again to save changes`, toastOptions);
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
          if (response.data.status === false) {
            toast.error(
              "An error occured while setting up your profile pic",
              toastOptions
            );
            isFetching(false);
          }
        } else {
          toast.error("Please choose a profile pic", toastOptions);
          isFetching(false);
        }
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error("Internal server error occured", toastOptions);
      console.log(error)     
    }
  };

  const handleValidation = () => {
    if (image === "") {
      toast.error("Please you have to tell us about yourself", toastOptions);
      return false;
    } else if (about === "") {
      toast.error("Please choose a profile pic", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
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
          <p>Choose your profile picture to help friends recognize you</p>
          {!image.preview && (
            <div
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              className="avatar py-3 d-flex justify-content-center"
            >
              <BsPersonCircle />
            </div>
          )}
          {image.preview && (
            <div
              onClick={handleClick}
              className="avatar-img py-3 d-flex justify-content-center"
            >
              <img
                src={image.preview}
                width="100"
                height="100"
                alt="profile-pic"
              />
            </div>
          )}
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <textarea
            maxLength={200}
            className="form-control"
            rows="4"
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell the world about yourself"
          />
          <span className="limit">Character Limit: 200</span>
          {!isFetching && <button type="submit">Submit</button>}
          {isFetching && (
            <button disabled type="submit">
              <RoundLoader />
            </button>
          )}
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
  p {
    color: var(--faded-secondary-color);
  }
  .avatar {
    svg {
      color: var(--color);
      font-size: 8.5rem;
    }
  }
  .avatar-img img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--primary-color);
    border-radius: 10px;
    padding: 2rem 3rem;
    input {
      padding: 0.6rem;
      border: 0.1rem solid #d9d8d8;
      border-radius: 0.4rem;
      color: var(--secondary-color);
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: none;
        outline: none;
      }
    }
    textarea {
      border: none;
      background: var(--faded-primary-color);
      color: var(--secondary-color);
      &:focus {
        border: none;
        outline: none;
      }
    }
    .limit {
      color: var(--faded-secondary-color);
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

export default SetImage;
