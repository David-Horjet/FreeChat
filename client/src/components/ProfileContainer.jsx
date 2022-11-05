import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import { host } from "../utils/APIRoutes";
import { FaPencilAlt } from "react-icons/fa";

function ProfileContainer({ profile, user }) {
  const image = `${host}/${profile.image}`;
  const [publicProfile, setPublicProfile] = useState(true);

  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (profile._id === user._id) {
      setPublicProfile(false);
    } else {
      setPublicProfile(true);
    }
  }, [profile._id, user._id]);

  const copyUsernameLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://freechatt.netlify.app/${profile.username}`
      );
      toast.success("Profile link successfully copied", toastOptions);
    } catch (err) {
      toast.error("An error occured copying profile link", toastOptions);
    }
  };

  const handleAddFriend = () => {
    alert("Coming in the next update")
  }

  return (
    <>
      <Container className="profileContainer">
        <div className="body-card">
          <div className="card-container col-sm-5 mx-auto d-flex justify-content-center">
            <div className="w-100 card">
              <div className="image d-flex flex-column justify-content-center align-items-center">
                <div className="cover-bg"></div>
                <div className="avatar">
                  <img src={image} className="w-100 h-100" alt="profile-pic" />
                  {!publicProfile && (
                    <div className="edit">
                      <Link to="/setimage">
                        <FaPencilAlt /> Edit
                      </Link>
                    </div>
                  )}
                </div>
                <h2 className="name mt-3">{profile.username}</h2>
                <div className="about d-flex flex-row justify-content-center align-items-center mt-3">
                  <p>{profile.about}</p>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span className="uname">@{profile.username}</span>{" "}
                  <span title="Copy link to clipboard">
                    <BiCopy onClick={() => copyUsernameLink()} />
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center my-3">
                  <span className="number">
                    1069 <span className="follow">Favourites</span>
                  </span>
                </div>
                {publicProfile && (
                  <div className=" d-flex mt-2">
                    <button onClick={handleAddFriend}>
                      <Link to="">Add Friend</Link>
                    </button>
                  </div>
                )}
                {!publicProfile && (
                  <div className=" d-flex mt-2">
                    <button>
                      <Link to={"/settings"}>Edit Profile</Link>
                    </button>
                  </div>
                )}
                <div className=" px-2 rounded my-3 date ">
                  <span className="join">
                    Joined{" "}
                    {new Date(profile.createdAt).toLocaleString("default", {
                      month: "short",
                    })}
                    , {new Date(profile.createdAt).getFullYear()}
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
  flex: 0 0 auto;
  width: 93.66666667%;

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
    .card-container {
      border-radius: 10px;
    }
  }
  .card {
    background: var(--faded-primary-color);
    border: none;
    .cover-bg {
      width: 100%;
      height: 100px;
      background: var(--gradient);
    }
  }
  .avatar {
    margin-top: -50px;
    width: 120px;
    height: 120px;
    overflow: hidden;
    position: relative;
    img {
      border-radius: 50%;
      object-fit: cover;
      overflow: hidden;
    }
    .edit {
      position: absolute;
      margin: -40px -40px 0 0;
      width: 100%;
      a {
        background: var(--gradient);
        padding: 8px;
        justify-content: flex-end;
        float: right;
        border-radius: 5px;
        font-size: 10px;
        color: var(--secondary-color);
      }
    }
  }
  .name {
    color: var(--secondary-color);
  }
  .about {
    p {
      color: var(--faded-secondary-color);
    }
  }
  .uname {
    color: var(--color);
  }
  span {
    svg {
      color: var(--lowOpacity-secondary-color);
      cursor: pointer;
    }
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
