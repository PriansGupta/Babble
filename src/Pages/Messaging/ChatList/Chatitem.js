import React, { useState } from "react";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { OpenUser } from "../../../Store/Actions";
import { CreateRoom } from "../../../Store/Actions";
import "./Chatlist.css";

const Chatitem = (props) => {
  const dispatch = useDispatch();
  const LoggedUser = useSelector((state) => state.UserUpdate);
  const selectChat = () => {
    // console.log(LoggedUser.name, props.name);
    const room = LoggedUser.name + props.name;
    const Room = {
      name: room.split("").sort().join(""),
    };
    dispatch(CreateRoom(Room));
    const User = {
      name: props.name,
      Profile: props.image,
      id: props.id,
    };
    dispatch(OpenUser(User));
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
