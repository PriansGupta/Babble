import React from "react";
import Avatar from "../ChatList/Avatar";
import "./Chatbody.css";

const Message = (props) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg"><p>{props.msg}</p></div>
        <div className="chat__meta">
          <span>1 min ago</span>
          <span>Seen 11.00AM</span>
        </div>
      </div>
      <Avatar isOnline="active" image={props.image} />
    </div>
  );
};

export default Message;
