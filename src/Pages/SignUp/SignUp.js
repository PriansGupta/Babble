import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import OtpModal from "../../Components/Modal/Modal";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import useInput from "../../Hooks/UserInput";
import usePost from "../../Hooks/PostRequest";
import useVerify from "../../Hooks/Verify";
import { useNavigate } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

const SignUp = () => {
  let formIsValid = false;
  const target1 = useRef(null);
  const target2 = useRef(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [Otp, setOtp] = useState("");

  const {
    value: enteredName,
    hasError: nameInputError,
    ValueChangeHandler: nameChangeHandler,
    TouchHandler: nameTouch,
    BlurHandler:nameBlur
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: EmailInputError,
    ValueChangeHandler: EmailChangeHandler,
    TouchHandler: emailTouch,
    BlurHandler:emailBlur
  } = useInput((value) => value.includes("@"));

  const { Request, Message, showModal, setOtpModal } = usePost();
  const { VerifyOtp, Verified, wrong, setWrong } = useVerify();

  formIsValid = !nameInputError && !EmailInputError;

  let navigate = useNavigate();
  useEffect(() => {
    if (Verified) {
      const user = {
        name: target1.current.value,
        email: target2.current.value,
      };
      localStorage.setItem("NewUser", JSON.stringify(user));
      navigate("/Password", { replace: true });
      toast("Email Verified", {
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
  }, [Verified, navigate]);

  useEffect(() => {
    if (wrong === "OTP Invalid") {
      toast.error("Incorrect OTP", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      setWrong("");
    }
  }, [wrong, setWrong]);

  useEffect(() => {
    setOtpModal(false);
    setLoading(false);
    if (showModal)
      toast.success("OTP Sent", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
  }, [showModal, setOtpModal]);

  useEffect(() => {
    setOtpModal(false);
    setLoading(false);
    if (Message !== "Message sent succesfully" && Message)
      toast.error(Message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
  }, [Message, setOtpModal]);

  const Submit = () => {
    setLoading(true);
    let User = {
      name: target1.current.value,
      email: target2.current.value,
    };
    if (formIsValid) Request(User);
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
                onBlur={nameBlur}
                value={enteredName}
                ref={target1}
              ></input>

              <Overlay
                target={target1.current}
                show={show1 && nameTouch}
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
                    Enter a Valid Name
                  </div>
                )}
              </Overlay>

              <input
                type="email"
                placeholder="Email"
                onChange={EmailChangeHandler}
                onFocus={emailTouch}
                onBlur={emailBlur}
                value={enteredEmail}
                ref={target2}
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
                      backgroundColor: "rgba(255, 100, 100, 0.85)",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    Enter a Valid Email
                  </div>
                )}
              </Overlay>
              <OtpModal
                buttonState={formIsValid}
                name="Sign Up"
                onClick={Submit}
                onVerify={onVerify}
                setOtp={setOtp}
                show={showModal}
                Loading={isLoading}
                email={target2}
              ></OtpModal>
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

export default SignUp;
