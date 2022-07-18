import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import OtpModal from "../../Components/Modal/Modal";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import useInput from "../../Hooks/UserInput";
import usePost from "../../Hooks/PostRequest";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { Authentication } from "../../Firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
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
  } = useInput((value) => value.length > 9);
  const { Request, Message } = usePost();

  const Submit = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "RecaptchaVerifier",
      {
        size: "invisible",
        callback: (response) => {},
      },
      Authentication
    );
    signInWithPhoneNumber(
      Authentication,
      "+91" + target2.current.value,
      window.recaptchaVerifier
    )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {});
  };

  const post = () => {
    console.log("HEllo");
  };
  const onVerify = () => {
    const User = {
      name: target1.current.value,
      phone: target2.current.value,
    };
    console.log(User);
    Request(User);
    console.log(Otp);
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(Otp)
      .then((result) => {
        console.log("Verified");
        const user = result.user;
        console.log(user);
        post();
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
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
                type="tel"
                placeholder="Mobile Number"
                onChange={EmailChangeHandler}
                onFocus={emailTouch}
                value={enteredEmail}
                ref={target2}
                maxLength={10}
              ></input>
              <Overlay target={target2.current} show={show2} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Enter a valid Phone Number
                  </Tooltip>
                )}
              </Overlay>
              <OtpModal
                buttonState={formIsValid}
                name="Sign Up"
                onClick={Submit}
                onVerify={onVerify}
                setOtp={setOtp}
              ></OtpModal>
              {Message && <p>{Message}</p>}
            </form>
          </div>
          <div id="RecaptchaVerifier"></div>
        </Row>
      </Container>
    </RoutesAnimation>
  );
};

export default SignUp;
