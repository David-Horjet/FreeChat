import React, { useState, useEffect, Fragment } from "react";
import { host } from "../utils/APIRoutes";
// import RoundLoader from "./Loaders/RoundLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

function Contact({
  index,
  contacts,
  changeCurrentChat,
  currentSelected,
  isLoading,
}) {
  const [loading, setLoading] = useState(true);

  const rowSkelotons = 8

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    let skelotonRows = []
    for (let index = 0; index < rowSkelotons; index++) {
      skelotonRows.push(
        <li>
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <Skeleton width={30} height={30} circle={true} />
                </div>
                <div className="px-2">
                  <Skeleton width={220} height={20} />
                  <Skeleton width={220} height={20} />
                </div>
              </div>
            </div>
          </li>
      )
    }
    return (
      <SkeletonTheme color="#5c5b5b" highlightColor="#525252">
        <SkeletonContainer>{skelotonRows}</SkeletonContainer>
      </SkeletonTheme>
    );
  } else {
    return (
      <Fragment>
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
                    <h6 className="mb-0 mt-1">{contact.username}</h6>
                    <div className="small text-secondary">
                      Frances sent a photo.
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </Fragment>
    );
  }
}

const SkeletonContainer = styled.div``;

export default Contact;
