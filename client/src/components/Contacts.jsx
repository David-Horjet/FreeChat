import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { host } from "../utils/APIRoutes";
import { BsSearch } from "react-icons/bs";
function Contacts({ contacts, currentUser, changeChat }) {
  console.log(contacts);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function getUser() {
      if (currentUser) {
        await JSON.parse(currentUser);
        setCurrentUserName(currentUser.username);
      }
    }
    getUser();
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // console.log(currentUserName);

  return (
    <>
      <Container className="col-lg-3 col-xxl-3">
        <div className="contacts col-lg-12 col-xxl-12">
          <nav className="navbar navbar-light navbar-expand-lg mx-0">
            <div className="offcanvas offcanvas-start" id="offcanvasNavbar">
              <div className="head">
                <form className="position-relative">
                  <input
                    className="form-control py-2"
                    type="search"
                    placeholder="Search for chats"
                    aria-label="Search"
                  />
                  <button
                    className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                    type="submit"
                  >
                    <BsSearch />
                  </button>
                </form>
              </div>
              <div className="offcanvas-body p-0">
                <div className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0">
                  <div className="h-100">
                    <div className="chat-tab-list custom-scrollbar">
                      <ul className="nav flex-column nav-pills nav-pills-soft">
                        {contacts.map((contact, index) => {
                          return (
                            <li
                              className={`contact ${
                                index === currentSelected ? "selected" : ""
                              }`}
                              key={index}
                              onClick={() => changeCurrentChat(index, contact)}
                              data-bs-dismiss="offcanvas"
                            >
                              <button
                                className="nav-link text-start w-100"
                                id="chat-1-tab"
                                data-bs-toggle="pill"
                                role="tab"
                              >
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={`${host}/${contact.image}`}
                                      alt="user-pic"
                                    />
                                  </div>
                                  <div className="flex-grow-1 d-block">
                                    <h6 className="mb-0 mt-1">
                                      {contact.username}
                                    </h6>
                                    <div className="small text-secondary">
                                      Frances sent a photo.
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </>
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
    background: var(--gradient);
  }

  .active a {
    /* color: var(--color) !important; */
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
    border-radius: 100%;
  }

  .contacts {
    height: 100%;
  }

  .head {
    padding: 1rem 1rem;
  }

  .navbar {
    height: 100%;
    padding: 0;
  }
  .navbar ul {
    gap: 10px;
  }
  .navbar ul li {
    font-size: 16px;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .navbar ul .selected {
    background-color: var(--faded-primary-color);
  }
  .navbar button {
    padding: 5px;
  }
  .offcanvas {
    background-color: var(--primary-color);
    border: 1px solid #fff;
    height: 100%;
    overflow: auto;
  }

  .navbar .offcanvas::-webkit-scrollbar {
    width: 5px;
  }

  .navbar .offcanvas::-webkit-scrollbar-thumb {
    background-color: #2f2f2f;
  }

  h6 {
    color: var(--secondary-color);
  }
`;

export default Contacts;
