import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container className="h-10">
      <div className="px-1 w-100 d-flex align-items-center">
        <div className="button-container">
          <div className="emoji me-2">
            <BsEmojiSmileFill onClick={handleEmojiPicker} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>

        <form
          className="comment-me w-100 d-flex align-items-center"
          onSubmit={(e) => sendChat(e)}
        >
          <input
            type="text"
            className="form-control pe-4"
            placeholder="Type something Dont be shy 😉"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />

          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  svg {
    color: var(--color);
    font-size: 25px;
    cursor: pointer;
    position: relative;
  }
  .emoji-picker-react {
    position: absolute;
    bottom: 80px;
    background-color: #000;
    z-index: 9900000;
    box-shadow: 0px 0px 0px;
  }

  .emoji-search {
    background-color: transparent;
  }

  .emoji-group:before {
    background-color: #000 !important;
  }

  .emoji-picker-react .emoji-categories button {
    background-color: var(--color);
  }

  .emoji-scroll-wrapper::-webkit-scrollbar {
    background-color: #000;
    width: 5px;
  }

  .emoji-scroll-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--color);
  }
  form {
    border: 1px solid var(--faded-secondary-color);
    border-radius: 30px;
    width: 80%;
    padding: 0 5px;
  }
  .form-control {
    background: transparent;
    border: none;
    color: var(--secondary-color);
    outline: none;
  }
  &:focus {
    border: none !important;
    outline: none;
  }
  button {
    border: none;
    background: transparent;
  }
`;

export default ChatInput;
