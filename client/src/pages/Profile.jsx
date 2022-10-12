import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { host } from "../utils/APIRoutes";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import ProfileContainer from "../components/ProfileContainer";

function Profile() {
  // const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("User");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });


  useEffect(() => {
    document.title = "Profile - FreeChat";
  });

  return (
    <>
      <Container>
        <div className="chat wrapper">
          <div className="chat-container">
            <div className="row">
              <SideNav
                currentUser={currentUser}
              />
              <ProfileContainer
                currentUser={currentUser}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  * {
    overflow-x: hidden;
  }
  .chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .chat-container {
    height: 100vh;
  }

  .chat-container .row {
    height: 100%;
  }

  .chat-container .row .contact-container {
    height: 100%;
  }

  .chat-container .row .contact-container .card {
    background-color: var(--primary-color);
    height: 100%;
  }

  .chat-container .row .contact-container .card .chat-conversation-content {
    height: 85%;
    overflow: auto;
    position: relative;
  }

  .chat-container
    .row
    .contact-container
    .card
    .chat-conversation-content::-webkit-scrollbar {
    width: 5px;
  }

  .chat-container
    .row
    .contact-container
    .card
    .chat-conversation-content::-webkit-scrollbar-thumb {
    background-color: rgb(65, 65, 65);
  }
`;

export default Profile;
