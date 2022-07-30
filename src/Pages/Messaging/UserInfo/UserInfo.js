import React from "react";
import { RadioButtonOn } from "react-ionicons";
import avatar from "../../../Assets/Avatars/profile.png"
import "./UserInfo.css";

const UserInfo = () => {
  return (
    <div className="User_Info">
      <div className="Profile">
          <img style={{width:"100%"}} alt="Profile" src={avatar}></img>
      </div>
      <h6>Priyansh Gupta</h6>
      <p style={{fontSize:"15px"}}>priyanshg615@gmail.com</p>
      <p style={{ color: "green" }}>
        <RadioButtonOn color={"green"} height="10px" width="10px" beat/>
        Active
      </p>
    </div>
  );
};

export default UserInfo;
