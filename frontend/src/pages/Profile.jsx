import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideNav from "../components/SideNav";
import ProfileContainer from "../components/ProfileContainer";
import { Context } from "../context/Context";
import { userRoute } from "../utils/APIRoutes";
import { authAxios } from "../utils/Axios";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.pathname.split("/")[1];
  const { user } = useContext(Context);

  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Profile - FreeChat";
  });

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true)
      const res = await authAxios.get(`${userRoute}/${username}`);
      if(res.data.status === false) {
        setLoading(false)
        navigate("*")
      } 
      if(res.data.status === true) {
        setLoading(false)
        setProfile(res.data.user)
      } 
    }
    fetchUserData();
  }, [navigate]);
  return (
    <>
      <Container>
        <div className="chat wrapper">
          <div className="chat-container">
            <div className="row">
              <SideNav user={user} />
              <ProfileContainer profile={profile} loading={loading} user={user} />
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
