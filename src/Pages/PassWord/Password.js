import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Eye } from "react-ionicons";
import { EyeOff } from "react-ionicons";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import useInput from "../../Hooks/UserInput";
import useCreateUser from "../../Hooks/CreateUser";
import { passwordStrength } from "check-password-strength";
import Overlay from "react-bootstrap/Overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import "./Password.css";

const Password = () => {
  const [hide, setHide] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  // const [formIsValid, setFormIsValid] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  // const [error, setError] = useState(true);
  const target1 = useRef(null);
  const target2 = useRef(null);
  // const navigate = useNavigate();

  const {
    value: enteredPassword,
    hasError: passwordInputError,
    ValueChangeHandler: passwordChangeHandler,
    TouchHandler: passwordTouch,
  } = useInput((value) => {
    const strength = passwordStrength(value);
    if (strength.value !== "Medium") return false;
    else return true;
  });

  const {
    value: enteredConfirmPassword,
    hasError: passwordConfirmInputError,
    ValueChangeHandler: passwordConfirmChangeHandler,
    TouchHandler: passwordConfirmTouch,
    // isTouched,
  } = useInput((value) => {
    const strength = passwordStrength(value);
    if (strength.value !== "Medium") return false;
    else return true;
  });

  const { newAccount, isLoggedIn, newPassword } = useCreateUser();

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Account Created", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (passwordInputError) setShow1(true);
    else setShow1(false);
  }, [passwordInputError]);

  useEffect(() => {
    if (passwordConfirmInputError) setShow2(true);
    else setShow2(false);
  }, [passwordConfirmInputError]);

  // useEffect(() => {
  //   if (enteredPassword === enteredConfirmPassword) setError(false);
  //   else setError(true);
  // }, [passwordConfirmInputError]);

  // useEffect(() => {
  //   if (!passwordInputError && !passwordConfirmInputError) setFormIsValid(true);
  //   else {
  //     setFormIsValid(false);
  //   }
  // }, [passwordInputError, passwordConfirmInputError]);

  const SaveUser = (e) => {
    e.preventDefault();
    const LocalData = JSON.parse(localStorage.getItem("NewUser"));
    if (LocalData.name) {
      const User = {
        name: LocalData.name,
        email: LocalData.email,
        password: target1.current.value,
      };
      newAccount(User);
    } else {
      const User = {
        email: LocalData.email,
        password: target1.current.value,
      };
      newPassword(User);
    }
  };
  const HideToggle = () => {
    if (!hide) setPasswordType("password");
    else setPasswordType("Text");
    setHide(!hide);
  };
  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="Password_form">
          <h1>Create a new Password</h1>
          <div className="form">
            <form onSubmit={SaveUser}>
              <input
                type="text"
                placeholder="Password"
                onFocus={passwordTouch}
                onChange={passwordChangeHandler}
                value={enteredPassword}
                ref={target1}
              ></input>
              <Overlay
                target={target1.current}
                show={show1 && passwordTouch}
                placement="right"
              >
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(255, 100, 100, 0.85)",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    Enter a strong Password
                  </div>
                )}
              </Overlay>
              <input
                disabled={passwordInputError}
                type={passwordType}
                placeholder="Confirm Password"
                onFocus={passwordConfirmTouch}
                onChange={passwordConfirmChangeHandler}
                value={enteredConfirmPassword}
                ref={target2}
              ></input>
              <Overlay
                target={target2.current}
                show={show2 && passwordConfirmTouch}
                placement="right"
              >
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(255, 100, 100, 0.85)",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    Re-enter your Password
                  </div>
                )}
              </Overlay>
              <div className="SavePasswordHide" onClick={HideToggle}>
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
              <button type="submit">Save Password</button>
            </form>
          </div>
        </Row>
      </Container>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </RoutesAnimation>
  );
};

export default Password;
