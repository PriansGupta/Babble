import React from "react";
import { useEffect, useRef } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import "./Chat.css";
import Chatlist from "../ChatList/Chatlist";
import Chatbody from "../Chatbody/Chatbody";
import UserInfo from "../UserInfo/UserInfo";
import SideRoutesAnimation from "../../../Components/RoutesAnimation/SideRouteAnimations";
import MenuOptions from "../Offcanvas/Offcanvas";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// import { ToastContainer, toast } from "react-toastify";
// import { Flip } from "react-toastify";
// import { ShareSocial } from "react-ionicons";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AddUser } from "../../../Store/Actions";

const Chat = (props) => {
  const myState = useSelector((state) => state.UserUpdate);
  const room = useSelector((state) => state.Room);
  const socket = useRef();
  console.log(room);
  useEffect(() => {
    if (myState) {
      socket.current = io("http://localhost:3001");
      socket.current.emit("add-user", ({ userId: myState.id, room: room }));
    }
  }, [myState]);
  return (
    <SideRoutesAnimation>
      <Container className="Main_Chat p-0" fluid>
        <MenuOptions></MenuOptions>
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
            <Chatbody socket={socket}></Chatbody>
          </Col>
          <Col xs={3} className="Main_3_col">
            <UserInfo name={props.name} email={props.email}></UserInfo>
            <button className="change_profile">Change Profile</button>
          </Col>
        </Row>
        {/* <ToastContainer
          transition={Flip}
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </Container>
    </SideRoutesAnimation>
  );
};

export default Chat;
