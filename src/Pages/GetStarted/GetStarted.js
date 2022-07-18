import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Password from "../PassWord/Password";
import Forgot from "../ForgotPass/Forgot";
import SideLogin from "../../Components/SideSection/SideLogin";
import SideSignUp from "../../Components/SideSection/SideSignUp";
import SidePassword from "../../Components/SideSection/SidePassword";
import SideForgot from "../../Components/SideSection/SideForgot";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GetStarted.css";

const GetStarted = () => {
  return (
    <Container className="p-0" fluid>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col xs={8} className="first_Col">
          <Row></Row>
          <Row>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Password" element={<Password />} />
              <Route path="/forgot" element={<Forgot />} />
            </Routes>
          </Row>
        </Col>
        <Col className="second_Col">
          <Routes>
            <Route path="/" element={<SideLogin></SideLogin>} />
            <Route path="/Login" element={<SideLogin></SideLogin>} />
            <Route path="/SignUp" element={<SideSignUp></SideSignUp>} />
            <Route path="/Password" element={<SidePassword></SidePassword>} />
            <Route path="/Forgot" element={<SideForgot></SideForgot>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default GetStarted;
