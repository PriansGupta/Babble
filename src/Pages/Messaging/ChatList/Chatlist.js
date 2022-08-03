import React, { Fragment } from "react";
import Chatitem from "./Chatitem";
import Profile from "../../../Assets/Avatars/profile.png";
import { Search } from "react-ionicons";
import "./Chatlist.css";

const Chatlist = () => {
  const allChatUsers = [
    {
      image: Profile,
      id: 1,
      name: "Mummy",
      active: true,
      isOnline: true,
    },
    {
      image: Profile,
      id: 2,
      name: "Papa",
      active: false,
      isOnline: false,
    },
    {
      image: Profile,
      id: 3,
      name: "Bhaiya",
      active: false,
      isOnline: false,
    },
    {
      image: Profile,
      id: 4,
      name: "Naani",
      active: false,
      isOnline: true,
    },
    {
      image: Profile,
      id: 5,
      name: "Himanshu",
      active: false,
      isOnline: false,
    },
    {
      image: Profile,
      id: 6,
      name: "Megha",
      active: false,
      isOnline: true,
    },
    {
      image: Profile,
      id: 7,
      name: "Shruti",
      active: false,
      isOnline: true,
    },
    {
      image: Profile,
      id: 8,
      name: "Sanskriti",
      active: false,
      isOnline: false,
    },
    {
      image: Profile,
      id: 9,
      name: "Shivangi",
      active: false,
      isOnline: true,
    },
  ];

  return (
    <Fragment>
      <div>
        <div className="chatlist__heading">
          <h2>Chats</h2>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Find People" required />
            <button className="search-btn">
              <Search
                color={"#00000"}
                title="Find People"
                height="25px"
                width="25px"
              />
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {allChatUsers.map((item, index) => {
            return (
              <Chatitem
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Chatlist;
