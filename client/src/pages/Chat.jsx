import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { usersRoute, host } from "../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { Context } from "../context/Context";
// import authAxios from "../utils/Axios"

function Chat() {
  const socket = useRef();

  const { user } = useContext(Context);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [user, setCurrentUser] = useState(() => {
  //   const saved = localStorage.getItem("User");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // });
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

  // useEffect(() => {
  //   if(user) {
  //     async function authUser() {
  //       const accessToken = localStorage.getItem("token");
  //       const data = await axios.post(`${userRoute}/${user._id}`, {
  //         headers: {
  //           "Authorization" : `Bearer ${accessToken}`
  //         }
  //       });
  //       console.log(data)
  //     }
  //     authUser()
  //   }
  // }, [user])

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    async function allUsers() {
      if (user) {
        setIsLoading(true);
        const data = await axios.get(`${usersRoute}/${user._id}`);
        if (data.data) {
          setIsLoading(false);
        }
        setContacts(data.data);
      }
    }
    allUsers();
  }, [user]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="chat wrapper">
          <div className="chat-container">
            <div className="row">
              <SideNav user={user} />
              <Contacts
                contacts={contacts}
                user={user}
                changeChat={handleChatChange}
                isLoading={isLoading}
              />
              {currentChat === undefined ? (
                <Welcome user={user} />
              ) : (
                <ChatContainer
                  currentChat={currentChat}
                  user={user}
                  socket={socket}
                  setCurrentChat={setCurrentChat}
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
