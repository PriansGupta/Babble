import React, { useRef, useEffect, useState } from "react";
import "./Chatbody.css";
import Avatar from "../ChatList/Avatar";
import Message from "./message";
import { Send, Add, Videocam, Enter } from "react-ionicons";
import Profile from "../../../Assets/Avatars/profile.png";
import { useSelector } from "react-redux";

const Chatbody = (props) => {
  const messagesEndRef = useRef(null);
  const [EnteredMessage, SetEnteredMessage] = useState("");
  const myState = useSelector((state) => state.CurrentUser);
  const LoggedIn = useSelector((state) => state.UserUpdate);
  // console.log(myState.id, LoggedIn.id);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const room = useSelector((state) => state.Room);
  const socket = props.socket;
  const [Chats, SetChats] = useState([]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [Chats]);

  const SendMessage = () => {
    if (EnteredMessage.length > 0) {
      socket.current.emit("send-msg", {
        to: myState.id,
        from: LoggedIn.id,
        message: EnteredMessage,
        room,
      });
      // const msgs = [...Chats];
      // msgs.push({
      //   key: EnteredMessage,
      //   type: "",
      //   msg: EnteredMessage,
      //   image: Profile,
      // });
      // SetChats(msgs);
      SetEnteredMessage("");
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        console.log(data.for, myState.id);
        if (data.for === myState.id) {
          setArrivalMessage({
            key: EnteredMessage,
            type: "",
            msg: data.message,
            image: Profile,
          });
        } else {
          setArrivalMessage({
            key: EnteredMessage,
            type: "other",
            msg: data.message,
            image: Profile,
          });
        }
        console.log("Received", data.message);
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && SetChats((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

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
            <Avatar isOnline="active" image={myState.Profile} />
            <p>{myState.name}</p>
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
