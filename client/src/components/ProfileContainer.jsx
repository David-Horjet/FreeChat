import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import { host } from "../utils/APIRoutes";

function ProfileContainer({ currentUser }) {
  console.log(currentUser);
  const image = `${host}/${currentUser.image}`;

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const copyUsernameLink = async () => {
    try {
      await navigator.clipboard.writeText("Copy this text to clipboard");
      toast.success("Profile link successfully copied", toastOptions);
    } catch (err) {
      toast.success("Profile link successfully copied", toastOptions);
    }
  };
  return (
    <>
      <Container className="col-lg-11 col-xxl-11">
        <div className="body-card">
          <div className="col-5 mx-auto d-flex justify-content-center">
            <div className="w-100 card p-4">
              <div className="image d-flex flex-column justify-content-center align-items-center">
                <div className="avatar">
                  <img src={image} className="w-100 h-100" />
                </div>
                <h2 className="name mt-3">{currentUser.username}</h2>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span className="uname">@{currentUser.username}</span>{" "}
                  <span title="Copy link to clipboard">
                    <BiCopy onClick={() => copyUsernameLink()} />
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                  <span className="number">
                    1069 <span className="follow">Favourites</span>
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                  <p>{currentUser.about}</p>
                </div>
                <div className=" d-flex mt-2">
                  <button>
                    <Link to={"/settings"}>Edit Profile</Link>
                  </button>
                </div>
                <div className=" px-2 rounded mt-4 date ">
                  <span className="join">
                    Joined{" "}
                    {new Date(currentUser.createdAt).toLocaleString("default", {
                      month: "short",
                    })}
                    , {new Date(currentUser.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
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
    overflow: auto;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .card {
    background: var(--faded-primary-color);
  }
  .avatar {
    width: 150px;
    height: 150px;
    img {
      border-radius: 50%;
      object-fit: cover;
      overflow: hidden;
    }
  }
  .name {
    color: var(--secondary-color);
  }
  .uname {
    color: var(--color);
  }
  svg {
    color: var(--lowOpacity-secondary-color);
    cursor: pointer;
  }
  .number {
    color: var(--faded-secondary-color);
  }
  button {
    background: var(--gradient);
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    a {
      color: #fff;
    }
  }
  .date {
    span {
      color: var(--lowOpacity-secondary-color);
    }
  }
`;

export default ProfileContainer;
