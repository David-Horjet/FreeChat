import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { host } from "../utils/APIRoutes";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosPeople, IoIosChatboxes } from "react-icons/io";
import { BsStarFill } from "react-icons/bs";
import { RiChatHistoryFill } from "react-icons/ri";

function SideNav({ user }) {
  return (
    <Container className="sideNav">
      <nav className="side-navbar">
        <div className="avatar-box d-flex justify-content-center">
          <Link to={`/${user.username}`} className="avatar">
            <img src={`${host}/${user.image}`} alt="" />
          </Link>
        </div>
        <ul>
          <li>
            <NavLink to={"/"}>
              <IoIosChatboxes />{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <IoIosPeople />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/settings"}>
              <RiChatHistoryFill />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <BsStarFill />
            </NavLink>
          </li>
        </ul>
        <div className="settings">
          <NavLink to={"/settings"}>
            <IoSettingsOutline />{" "}
          </NavLink>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 auto;
  width: 6.33333333%;
  padding: 10px;
  background-color: var(--faded-primary-color);
  flex-shrink: 0;

  .header {
    border: 1px solid #fff;
  }

  .side-navbar {
    background: var(--gradient);
    border-radius: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    ul {
      display: flex;
      flex-direction: column;
      gap: 20px;
      li {
        padding: 15px 0;
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 5px;
      }
    }
  }

  .side-navbar svg {
    font-size: 20px;
  }

  .settings {
    display: flex;
    justify-content: center;
  }

  .settings a {
    color: #ffffff;
  }

  .side-navbar li a.active {
    color: #fff;
  }

  /* .active a {
    color: #fff;
  } */

  .side-navbar li a {
    color: #eaeaeade;
    line-height: 1.3;
    &:hover {
    color: #fff;
    }
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
    width: 40px;
    height: 40px;
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
