import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
  useEffect(() => {
    if (props.show) setShow(true);
  }, [props.show]);

  const handleShow = () => {
    props.onClick();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.Loading ? "Loading…" : `${props.name}`}
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
            <p>{`One Time Password(OTP) has been sent to your Email`}</p>
            <form>
              <input type="tel" maxLength="6" onChange={enteredOtp}></input>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="verify" variant="secondary" onClick={handleClose}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OtpModal;
