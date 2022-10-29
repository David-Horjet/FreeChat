import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { host } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
import { BsFillGridFill, BsSearch } from "react-icons/bs";
import RoundLoader from "./Loaders/RoundLoader";

function Contacts({ contacts, changeChat, user }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contacts.length <= 0) {
      setIsLoading(true);
    }
  }, [contacts]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container className="contacts-container">
        <div className="contacts col-sm-12">
          <nav className="navbar-expand-lg mx-0">
            <div className="offcanvas offcanvas-start" id="offcanvasNavbar">
              <div className="card-head">
                <div className=" d-flex justify-content-between align-items-center">
                  <h1 className="h5 mb-0">Chats</h1>
                  <Link to={`/${user.username}`} className="dropend position-relative">
                    <BsFillGridFill />
                  </Link>
                </div>
              </div>
              <div className="head pb-3">
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
                <div className="card card-chat-list rounded-end-lg-0 card-body rounded-top-0">
                  <div className="h-100 custom-scrollbar">
                    <div className="chat-tab-list custom-scrollbar">
                      {isLoading ? (
                        <ul className="nav flex-column nav-pills nav-pills-soft">
                          {contacts.map((contact, index) => {
                            return (
                              <li
                                className={`contact ${
                                  index === currentSelected ? "selected" : ""
                                }`}
                                key={index}
                                onClick={() =>
                                  changeCurrentChat(index, contact)
                                }
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
                      ) : (
                        <RoundLoader />
                      )}
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
  flex: 0 0 auto;
  width: 25%;
  background-color: var(--primary-color);
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--faded-secondary-color);
  }
  hr {
    background-color: var(--faded-secondary-color);
    color: var(--faded-secondary-color);
  }

  .header {
    background-color: var(--faded-primary-color);
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
    object-fit: cover;
  }

  .contacts {
    height: 100%;
  }

  .card-head {
    padding: 1.2rem;
    h1 {
      color: var(--secondary-color);
    }
    .dropend {
      svg {
        color: var(--secondary-color);
      }
    }
  }

  .head {
    padding: 0rem 1rem;
    .form-control {
      background-color: var(--faded-primary-color);
      border: none;
      color: var(--secondary-color);
      border-radius: 10px;
      &:focus {
        outline: none;
      }
    }
  }

  .offcanvas-body {
    height: 80vh;

    .navbar {
      height: 100%;
      padding: 0;
    }
    ul {
      gap: 10px;
    }
    ul li {
      font-size: 16px;
      border-radius: 5px;
      padding: 5px 10px;
    }
    ul .selected button {
      background: var(--gradient);
    }
    button {
      padding: 8px;
      background-color: var(--faded-primary-color);
      border-radius: 10px;
      .small {
        color: var(--faded-secondary-color) !important;
      }
    }
    .offcanvas {
      height: 100%;
      overflow: auto;
      .card {
        border: none;
      }
    }
  }

  h6 {
    color: var(--secondary-color);
  }
`;

export default Contacts;
