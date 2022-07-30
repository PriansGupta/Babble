import React, { useState } from "react";
import Avatar from "./Avatar";
import "./Chatlist.css";

const Chatitem = (props) => {
  const selectChat = () => {
    console.log("Click");
  };

  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={selectChat}
      className={`chatlist__item ${props.active ? "active" : ""} `}
    >
      <Avatar
        image={props.image ? props.image : "http://placehold.it/80x80"}
        isOnline={props.isOnline}
      />
      <div className="userMeta">
        <p>{props.name}</p>
        <span className="activeTime">1 min ago</span>
      </div>
    </div>
  );
};

export default Chatitem;
