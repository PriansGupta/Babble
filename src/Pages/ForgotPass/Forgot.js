import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import OtpModal from "../../Components/Modal/Modal";
import "./Forgot.css";

const Forgot = () => {
  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="Forgot_form">
          <h1>Account Recovery</h1>
          <p>
            To recover the password for your account, <br></br>please provide us the
            account details.
          </p>
          <div className="form">
            <form>
              <input type="email" placeholder="Registered Email"></input>
              <OtpModal name="Proceed" ></OtpModal>
            </form>
          </div>
        </Row>
      </Container>
    </RoutesAnimation>
  );
};

export default Forgot;
