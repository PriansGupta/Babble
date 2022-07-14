import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import OtpModal from "../../Components/Modal/Modal";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import "./SignUp.css";

const SignUp = () => {
  const [hide, setHide] = useState(true);

  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="SignUp_form">
          <h1>Create a new Account</h1>
          <div className="form">
            <form>
              <input type="text" placeholder="Full Name"></input>
              <input type="email" placeholder="Email"></input>
              <input type="date" placeholder="DOB"></input>
              <OtpModal name="Sign Up"></OtpModal>
            </form>
          </div>
        </Row>
      </Container>
    </RoutesAnimation>
  );
};

export default SignUp;
