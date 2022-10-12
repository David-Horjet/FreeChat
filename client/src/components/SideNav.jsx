import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { host } from "../utils/APIRoutes";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosPeople, IoIosChatboxes } from "react-icons/io";
import { BsPersonBadge, BsStarFill } from "react-icons/bs";

function SideNav({ currentUser }) {
  return (
    <Container className="navbar-col col-lg-1 col-xxl-1">
      <nav className="side-navbar">
        <div className="w-100 d-flex justify-content-center">
          <Link to={"/profile"} className="avatar">
            <img src={`${host}/${currentUser.image}`} alt="" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to={"/"}>
              <IoIosChatboxes />{" "}
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <IoIosPeople />
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <BsPersonBadge />
            </Link>
          </li>
          <li className="active">
            <Link to={"/"}>
              <BsStarFill />
            </Link>
          </li>
        </ul>
        <div className="settings">
          <Link to={"/settings"}>
            <IoSettingsOutline />{" "}
          </Link>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .header {
    background-color: var(--primary-color);
    border: 1px solid #fff;
  }

  .side-navbar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
  }

  .side-navbar svg {
    font-size: 25px;
  }

  .side-navbar li {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 5px;
  }

  .settings {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .settings a {
    color: var(--faded-secondary-color);
  }

  .active {
    border-right: 5px solid var(--color);
  }

  .active a {
    color: var(--color) !important;
  }

  .side-navbar li a {
    color: var(--faded-secondary-color);
  }

  .contacts-info h3 {
    font-size: 15px;
    color: var(--secondary-color);
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .contacts-info span {
    margin-left: 10px;
    padding: 2px 6px;
    background-color: #ff006657;
    color: var(--color);
    border-radius: 2px 2px 2px;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    object-fit: cover;
  }
`;

export default SideNav;
