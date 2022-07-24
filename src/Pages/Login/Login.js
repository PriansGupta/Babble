import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Eye } from "react-ionicons";
import { EyeOff } from "react-ionicons";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import { NavLink } from "react-router-dom";
import useInput from "../../Hooks/UserInput";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
// import { useNavigate } from "react-router-dom";
import useLogin from "../../Hooks/login";

import "./Login.css";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [formIsValid, setFormIsValid] = useState(false);
  const [hide, setHide] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);
  const target2 = useRef(null);
  // const navigate = useNavigate();
  const {
    value: enteredPassword,
    hasError: PasswordInputError,
    ValueChangeHandler: PasswordChangeHandler,
    TouchHandler: PasswordTouch,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: EmailInputError,
    ValueChangeHandler: EmailChangeHandler,
    TouchHandler: emailTouch,
  } = useInput((value) => value.includes("@"));

  const { LoginToAccount, isLoggedIn } = useLogin();

  useEffect(() => {
    if (isLoggedIn) console.log("LOgged in");
  }, [isLoggedIn]);

  const Submit = (e) => {
    e.preventDefault();
    const Data = {
      email: target2.current.value,
      password: target1.current.value,
    };
    if (formIsValid) LoginToAccount(Data);
  };

  useEffect(() => {
    if (PasswordInputError) setShow1(true);
    else setShow1(false);
  }, [PasswordInputError]);

  useEffect(() => {
    if (EmailInputError) setShow2(true);
    else setShow2(false);
  }, [EmailInputError]);

  useEffect(() => {
    if (!PasswordInputError && !EmailInputError) setFormIsValid(true);
    else {
      setFormIsValid(false);
    }
  }, [PasswordInputError, EmailInputError]);

  const HideToggle = () => {
    if (!hide) setPasswordType("password");
    else setPasswordType("Text");
    setHide(!hide);
  };

  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="Login_form">
          <h1>Login to your Account</h1>
          <div className="form">
            <form onSubmit={Submit}>
              <input
                type="email"
                placeholder="Email"
                ref={target2}
                onChange={EmailChangeHandler}
                onFocus={emailTouch}
                value={enteredEmail}
              ></input>
              <Overlay target={target2.current} show={show2} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Enter a Valid email
                  </Tooltip>
                )}
              </Overlay>
              <input
                type={passwordType}
                placeholder="Password"
                ref={target1}
                onChange={PasswordChangeHandler}
                onFocus={PasswordTouch}
                value={enteredPassword}
              ></input>
              <Overlay target={target1.current} show={show1} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Enter your Password
                  </Tooltip>
                )}
              </Overlay>
              <div className="passwordHide" onClick={HideToggle}>
                {!hide && (
                  <Eye
                    color={"#00000"}
                    title="hide"
                    height="30px"
                    width="30px"
                  />
                )}
                {hide && (
                  <EyeOff
                    color={"#00000"}
                    title="Show"
                    height="30px"
                    width="30px"
                  />
                )}
              </div>
              <NavLink to="/Forgot" className="forgotLink">
                Forgot your Password?
              </NavLink>
              <button type="submit">Login In</button>
            </form>
          </div>
        </Row>
      </Container>
    </RoutesAnimation>
  );
};

export default Login;
