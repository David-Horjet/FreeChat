import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { usersRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";
import SideNav from "../components/SideNav";
import { Context } from "../context/Context";
import { authAxios } from "../utils/Axios";
import { handleErrors } from "../utils/errorHandler";

function Chat() {
  const socket = useRef();

  const { user } = useContext(Context);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    document.title = "Chat - FreeChat";
  });

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    async function allUsers() {
      try {
        if (user) {
          setIsLoading(true);
          const res = await authAxios.get(usersRoute);
          if (res.data.status === false) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setContacts(res.data);
          }
        }
      } catch (error) {
        setIsLoading(false);
        handleErrors(error);
        console.log(error);
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
  l .chat {
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

  /* Track */
  .chat-conversation-content::-webkit-scrollbar-track {
    background-color: #1f1f1f;
  }

  /* Handle */
  .chat-conversation-content::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  /* Handle on hover */
  .chat-conversation-content::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }

  /* Corner */
  .chat-conversation-content::-webkit-scrollbar-corner {
    background-color: #1f1f1f;
  }
`;

export default Chat;
