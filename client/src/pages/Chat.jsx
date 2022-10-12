import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { userRoute, usersRoute, host } from "../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
// import authAxios from "../utils/Axios"

function Chat() {
  const socket = useRef();
  // const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("User");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    document.title = "Chat - FreeChat";
  });
                         
  // useEffect(() => {
  //   async function getUser() {
      
  //     if (!localStorage.getItem("User")) {
  //       navigate("/login");
  //     } else {
  //       setCurrentUser(JSON.parse(localStorage.getItem("User")));
  //     }
  //   }
  //   getUser()
  // }, [navigate]);

  console.log(currentUser)

  useEffect(() => {
    if(currentUser) {
      async function authUser() {
        const accessToken = localStorage.getItem("token");
        const data = await axios.post(`${userRoute}/${currentUser._id}`, {
          headers: {
            "Authorization" : `Bearer ${accessToken}`
          }
        });
        console.log(data)
      } 
      authUser()
    }
  }, [currentUser])

  useEffect(() => {
    if(currentUser) {
      async function authUser() {
      
        console.log(currentUser)
  
        const data = await axios.get(`${userRoute}/${currentUser._id}`)
        console.log(data)
      } 
      authUser()
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function allUsers() {
      if (currentUser) {
        const data = await axios.get(`${usersRoute}/${currentUser._id}`);
        console.log(data);
  
        setContacts(data.data);
      }
    }
    allUsers();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="chat wrapper">
          <div className="chat-container">
            <div className="row">
              <SideNav
                currentUser={currentUser}
              />
              <Contacts
                contacts={contacts}
                currentUser={currentUser}
                changeChat={handleChatChange}
              />
              {currentChat === undefined ? (
                <Welcome currentUser={currentUser} />
              ) : (
                <ChatContainer
                  currentChat={currentChat}
                  currentUser={currentUser}
                  socket={socket}
                />
              )}
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

export default Chat;
