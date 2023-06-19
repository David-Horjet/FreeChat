import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillAudio } from "react-icons/ai";
import ChatInput from "./ChatInput";
import {
  getAllMessagesRoute,
  host,
  sendMessageRoute,
} from "../utils/APIRoutes";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

function ChatContainer({ currentChat, user, socket, setCurrentChat }) {
  const image = `${host}/${currentChat.image}`;

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    async function getMsg() {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: user._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    getMsg();
  }, [currentChat, user]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: user._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  console.log(messages);

  const handleBack = () => {
    setCurrentChat(undefined);
  };

  const handleAudio = () => {
    alert("Coming in the next update")
  }

  return (
    <>
      <Container className="chatContainer">
        <div className="card card-chat ">
          <div className="card-body">
            <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
              <div
                className="fade tab-pane show active"
                id="chat-1"
                role="tabpanel"
                aria-labelledby="chat-1-tab"
              >
                <div className="border-bottom p-2 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="back">
                      <BsArrowLeft onClick={handleBack} />
                    </div>
                    <Link
                      to={`/${currentChat.username}`}
                      className="d-flex mb-2 mb-sm-0"
                    >
                      <div className="flex-shrink-0 avatar me-2">
                        <img
                          className="avatar-img rounded-circle"
                          src={image}
                          alt=""
                        />
                      </div>
                      <div className="d-block flex-grow-1">
                        <h6 className="mb-0 mt-1">{currentChat.username}</h6>
                        <div className="small text-secondary">
                          <i className="fa-solid fa-circle text-success me-1"></i>
                          Online
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="call d-flex align-items-center">
                    {/* <!-- Call button --> */}
                    <a
                      href="#!"
                      className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Audio call"
                    >
                      <AiFillAudio onClick={handleAudio} />
                    </a>
                    <a
                      href="#!"
                      className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Video call"
                    >
                      <FaVideo onClick={handleAudio} />
                    </a>
                    <span>
                      <BsThreeDotsVertical onClick={handleAudio} />
                    </span>
                  </div>
                </div>
                {/* <!-- Top avatar and status END --> */}
                <hr />

                {/* <!-- Chat conversation START --> */}
                <div className="chat-conversation-content custom-scrollbar">
                  {messages.map((message) => (
                    <div ref={scrollRef} key={uuid4()}>
                      {/* <!-- Chat message --> */}
                      <div
                        className={`d-flex mb-1 ${
                          message.fromSelf ? "sended" : "received"
                        }`}
                      >
                        <div className="message-body">
                          <div className="w-100">
                            <div className="d-flex flex-column align-items-start">
                              <div className="message p-2 px-3 rounded-2">
                                {message.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span>
                          {message.time ? (
                            <div>
                              {new Date(message.time).getHours()}:
                              {new Date(message.time).getMinutes()}
                            </div>
                          ) : (
                            <div>Just now</div>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ChatInput handleSendMsg={handleSendMsg} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  flex: 0 0 auto;
  width: 68.66666667%;
  background-color: var(--faded-primary-color);

  .card {
    height: 100%;
  }

  .tab-pane {
    height: 90%;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  h6 {
    color: var(--secondary-color);
  }

  .call svg {
    color: var(--secondary-color);
  }

  .chat-conversation-content {
    padding: 20px;
  }

  .back {
    margin-right: 20px;
    svg {
      color: var(--secondary-color);
      font-size: 20px;
    }
  }

  .chat-conversation-content .sended {
    justify-content: flex-end !important;
  }

  .chat-container .call svg {
    font-size: 25px;
    color: var(--secondary-color);
  }

  .chat-conversation-content .sended .message-body {
    border-radius: 8px;
    border-top-right-radius: 0px;
    background: var(--gradient);
    font-size: 12px;
  }

  .chat-conversation-content .received .message-body {
    border-radius: 8px;
    border-top-left-radius: 0px;
    background-color: var(--color);
    font-size: 12px;
  }

  .chat-conversation-content .message {
    color: #fff;
  }

  .chat-conversation-content span {
    font-size: 10px;
    padding-top: 15px;
    padding-left: 5px;
    color: var(--secondary-color);
  }
`;

export default ChatContainer;
