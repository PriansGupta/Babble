import React, { useRef, useEffect, useState } from "react";
import "./Chatbody.css";
import Avatar from "../ChatList/Avatar";
import Message from "./message";
import { Send, Add, Videocam } from "react-ionicons";
import Profile from "../../../Assets/Avatars/profile.png";

const Chatbody = (props) => {
  const messagesEndRef = useRef(null);
  const [EnteredMessage, SetEnteredMessage] = useState("");

  const [Chats, SetChats] = useState([
    {
      key: 1,
      image: Profile,
      type: "",
      msg: "Hi, How are you?",
    },
    {
      key: 2,
      image: Profile,
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image: Profile,
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image: Profile,
      type: "",
      msg: "I'm also good.",
    },
    {
      key: 5,
      image: Profile,
      type: "other",
      msg: "Had your dinner....?",
    },
    {
      key: 6,
      image: Profile,
      type: "",
      msg: "Yes",
    },
    {
      key: 7,
      image: Profile,
      type: "other",
      msg: "Good",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [Chats]);

  const SendMessage = () => {
    if (EnteredMessage.length > 0) {
      const NewChats = [
        ...Chats,
        {
          key: EnteredMessage,
          type: "",
          msg: EnteredMessage,
          image: Profile,
        },
      ];
      SetChats(NewChats);
      console.log(NewChats);
      SetEnteredMessage("");
    }
  };

  const MessageChangeHandler = (e) => {
    SetEnteredMessage(e.target.value);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        SendMessage();
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [SendMessage]);

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar isOnline="active" image={Profile} />
            <p>Mummy</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <Videocam
                color={"#00000"}
                title="Video Chat"
                height="25px"
                width="25px"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {Chats.map((itm, index) => {
            return (
              <Message
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <Add color={"#00000"} title="Attach" height="20px" width="20px" />
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={MessageChangeHandler}
            value={EnteredMessage}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={SendMessage}>
            <Send color="white" title="Send" height="20px" width="20px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbody;
