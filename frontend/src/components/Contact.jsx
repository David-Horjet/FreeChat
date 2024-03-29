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
  searchText,
  isLoading,
}) {
  // const [loading, setLoading] = useState(true);
  // console.log(contacts)

  const rowSkelotons = 8;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const truncate = (input) =>
    input?.length > 40 ? `${input.substring(0, 40)}...` : input;

  if (isLoading) {
    let skelotonRows = [];
    for (let index = 0; index < rowSkelotons; index++) {
      skelotonRows.push(
        <li key={index}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <Skeleton width={40} height={40} circle={true} />
              </div>
              <div className="px-2">
                <Skeleton width={230} height={25} />
                <Skeleton width={180} height={25} />
              </div>
            </div>
          </div>
        </li>
      );
    }
    return (
      <SkeletonTheme color="#5c5b5b" highlightColor="#525252">
        <SkeletonContainer>{skelotonRows}</SkeletonContainer>
      </SkeletonTheme>
    );
  } else {
    return (
      <Fragment>
        {contacts?.users
          ?.filter((contact) =>
            contact.username.toLowerCase().includes(searchText)
          )
          .map((contact, index) => {
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
                        src={contact.image}
                        alt="user-pic"
                      />
                    </div>
                    <div className="flex-grow-1 d-block">
                      <h6 className="mb-0 mt-1">{contact.username}</h6>
                      {contact.about ? (
                        <div className="small text-secondary">
                          {truncate(contact.about)}
                        </div>
                      ) : (
                        <div className="small text-secondary">
                          This user is yet to describe himself
                        </div>
                      )}
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
