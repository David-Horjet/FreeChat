import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import { host } from "../utils/APIRoutes";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import SettingsContainer from "../components/SettingsContainer";
import { authAxios } from "../utils/Axios";
import { userRoute } from "../utils/APIRoutes";

function Settings({switchTheme}) {

  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Settings - FreeChat";
  });

   useEffect(() => {
     async function fetchUserData() {
       setLoading(true);
       const res = await authAxios.get(userRoute);
       if (res.data.status === false) {
         setLoading(false);
       }
       if (res.data.status === true) {
         setLoading(false);
         setProfile(res.data.user);
       }
     }
     fetchUserData();
   }, []);

  return (
    <>
      <Container>
        <div className="chat wrapper">
          <div className="chat-container">
            <div className="row">
              <SideNav user={profile} loading={loading} />
              <SettingsContainer switchTheme={switchTheme} user={profile} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
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

export default Settings;
