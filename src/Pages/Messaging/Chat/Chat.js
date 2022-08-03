import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import "./Chat.css";
import Chatlist from "../ChatList/Chatlist";
import Chatbody from "../Chatbody/Chatbody";
import UserInfo from "../UserInfo/UserInfo";
import SideRoutesAnimation from "../../../Components/RoutesAnimation/SideRouteAnimations";
import MenuOptions from "../Offcanvas/Offcanvas";
import { NavLink } from "react-router-dom";

const Chat = () => {
  return (
    <SideRoutesAnimation>
      <Container className="Main_Chat p-0" fluid>
        {/* <NavLink to="/User/chats/Options"> */}
          <MenuOptions></MenuOptions>
        {/* </NavLink> */}
        <Row style={{ height: "auto" }}>
          <Col xs={3} className="Main_1_col">
            <Row
              style={{
                width: "100%",
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="xyz"
            >
              <Chatlist></Chatlist>
            </Row>
          </Col>
          <Col xs={6} className="Main_2_col">
            <Chatbody></Chatbody>
          </Col>
          <Col xs={3} className="Main_3_col">
            <UserInfo></UserInfo>
            <button className="change_profile">Change Profile</button>
          </Col>
        </Row>
      </Container>
    </SideRoutesAnimation>
  );
};

export default Chat;
