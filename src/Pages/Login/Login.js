import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Eye } from "react-ionicons";
import { EyeOff } from "react-ionicons";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import { NavLink } from "react-router-dom";
import useInput from "../../Hooks/UserInput";
import Overlay from "react-bootstrap/Overlay";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useLogin from "../../Hooks/login";
import { useDispatch } from "react-redux";
import { LoggedIn } from "../../Store/Actions";
import { AddUser } from "../../Store/Actions";
import "./Login.css";

const Login = () => {
  let socket;
  const ENDPOINT = "http://localhost:3001";
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  let formIsValid;
  const [hide, setHide] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const target1 = useRef(null);
  const target2 = useRef(null);
  const navigate = useNavigate();
  const {
    value: enteredPassword,
    hasError: PasswordInputError,
    ValueChangeHandler: PasswordChangeHandler,
    TouchHandler: PasswordTouch,
    BlurHandler: PasswordBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: EmailInputError,
    ValueChangeHandler: EmailChangeHandler,
    TouchHandler: emailTouch,
    BlurHandler: emailBlur,
  } = useInput((value) => value.includes("@"));

  const {
    LoginToAccount,
    isLoggedIn,
    Unable,
    setUnable,
    setIsLogged,
    UserData,
  } = useLogin();

  if (!PasswordInputError && !EmailInputError) formIsValid = true;
  else formIsValid = false;

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
      console.log("Logged in");

      // dispatch(AddUser(NewUser));
      dispatch(LoggedIn(UserData));
      toast.success("Logged In Succesfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      navigate("/User/chats", { replace: true });
    }
    setIsLogged(false);
  }, [isLoggedIn, setIsLogged, UserData, dispatch, navigate]);

  useEffect(() => {
    if (Unable) {
      setLoading(false);
      toast.error("Unable to login", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    }
    setUnable(false);
  }, [Unable, setUnable]);

  const Submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const Data = {
      email: target2.current.value,
      password: target1.current.value,
    };
    if (formIsValid) LoginToAccount(Data);
    else {
      setLoading(false);
      toast.error("Enter Valid Details", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    }
  };

  useEffect(() => {
    if (PasswordInputError) setShow1(true);
    else setShow1(false);
  }, [PasswordInputError]);

  useEffect(() => {
    if (EmailInputError) setShow2(true);
    else setShow2(false);
  }, [EmailInputError]);

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
                onBlur={emailBlur}
                value={enteredEmail}
                // value="priyanshg615@gmail.com"
              ></input>
              <Overlay
                target={target2.current}
                show={show2 && emailTouch}
                placement="right"
              >
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: "absolute",
                      backgroundColor: "orange",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    Enter your Email
                  </div>
                )}
              </Overlay>
              <input
                type={passwordType}
                placeholder="Password"
                ref={target1}
                onChange={PasswordChangeHandler}
                onFocus={PasswordTouch}
                value={enteredPassword}
                // value="Aman@4321"
                onBlur={PasswordBlur}
              ></input>
              <Overlay
                target={target1.current}
                show={show1 && PasswordTouch}
                placement="right"
              >
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: "absolute",
                      backgroundColor: "orange",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    Enter your Password
                  </div>
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
              <NavLink to="/HomePage/Forgot" className="forgotLink">
                Forgot your Password?
              </NavLink>
              <button type="submit">{isLoading ? "Loading…" : "Login"}</button>
            </form>
          </div>
        </Row>
      </Container>
      <ToastContainer
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
      />
    </RoutesAnimation>
  );
};

export default Login;
