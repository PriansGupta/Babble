import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import OtpModal from "../../Components/Modal/Modal";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import useInput from "../../Hooks/UserInput";
import usePost from "../../Hooks/PostRequest";
import useVerify from "../../Hooks/Verify";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const target1 = useRef(null);
  const target2 = useRef(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [Otp, setOtp] = useState("");

  const {
    value: enteredName,
    hasError: nameInputError,
    ValueChangeHandler: nameChangeHandler,
    TouchHandler: nameTouch,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: EmailInputError,
    ValueChangeHandler: EmailChangeHandler,
    TouchHandler: emailTouch,
  } = useInput((value) => value.includes("@"));

  const { Request, Message, showModal } = usePost();
  const { VerifyOtp, Verified } = useVerify();

  let navigate = useNavigate();
  useEffect(() => {
    if (Verified) {
      const user = {
        name: target1.current.value,
        email: target2.current.value,
      };
      localStorage.setItem('NewUser', JSON.stringify(user));
      navigate("/Password", { replace: true });
    }
  }, [Verified,navigate]);

  const Submit = () => {
    let User = {
      name: target1.current.value,
      email: target2.current.value,
    };
    Request(User);
  };

  const onVerify = () => {
    const OTP = {
      otp: Otp,
      name: target1.current.value,
      email: target2.current.value,
    };
    VerifyOtp(OTP);
  };
  useEffect(() => {
    if (nameInputError) setShow1(true);
    else setShow1(false);
  }, [nameInputError]);

  useEffect(() => {
    if (EmailInputError) setShow2(true);
    else setShow2(false);
  }, [EmailInputError]);

  useEffect(() => {
    if (!nameInputError && !EmailInputError) setFormIsValid(true);
    else {
      setFormIsValid(false);
    }
  }, [nameInputError, EmailInputError]);

  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="SignUp_form">
          <h1>Create a new Account</h1>
          <div className="form">
            <form>
              <input
                type="text"
                placeholder="Full Name"
                onChange={nameChangeHandler}
                onFocus={nameTouch}
                value={enteredName}
                ref={target1}
              ></input>
              <Overlay target={target1.current} show={show1} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Enter your name
                  </Tooltip>
                )}
              </Overlay>
              <input
                type="email"
                placeholder="Email"
                onChange={EmailChangeHandler}
                onFocus={emailTouch}
                value={enteredEmail}
                ref={target2}
              ></input>
              <Overlay target={target2.current} show={show2} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Enter a valid Email
                  </Tooltip>
                )}
              </Overlay>
              <OtpModal
                buttonState={formIsValid}
                name="Sign Up"
                onClick={Submit}
                onVerify={onVerify}
                setOtp={setOtp}
                show={showModal}
              ></OtpModal>
              {Message && <p>{Message}</p>}
            </form>
          </div>
        </Row>
      </Container>
    </RoutesAnimation>
  );
};

export default SignUp;
