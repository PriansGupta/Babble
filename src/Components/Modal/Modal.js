import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import "./Modal.css";

function OtpModal(props) {
  const [show, setShow] = useState(false);


  const enteredOtp = (e) => {
    props.setOtp(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
    props.onVerify();
  };
  const handleShow = () => {
    setShow(true);
    props.onClick();
  };

  return (
    <>
      <Button
        disabled={!props.buttonState}
        variant="primary"
        onClick={handleShow}
      >
        {props.name}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="ModalBox"
      >
        <Modal.Header closeButton>
          <Modal.Title className="OtpModal">OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="otp_input">
            <p>One Time Password(OTP) has been sent to pri*****615@gmail.com</p>
            <form>
              <input type="tel" maxLength="6" onChange={enteredOtp}></input>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <NavLink to="/Password">
            <Button
              className="verify"
              variant="secondary"
              onClick={handleClose}
            >
              Verify
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OtpModal;
