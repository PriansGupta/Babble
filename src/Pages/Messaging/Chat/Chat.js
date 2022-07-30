import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Logo from "../../../Components/Logo/Logo";
import "./Chat.css";
import UserInfo from "../UserInfo/UserInfo";
import Chatlist from "../ChatList/Chatlist";
const Chat = () => {
  return (
    <Container className="Main_Chat p-0" fluid>
      {/* <Row
        style={{
          width: "101%",
          height: "20px",
          backgroundColor: "rgba(0, 212, 255, 1)",
        }}
      ></Row> */}
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
          {/* Chats */}
        </Col>
        <Col xs={3} className="Main_3_col">
          {/* Options */}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
