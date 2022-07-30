import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import OtpModal from "../../Components/Modal/Modal";
import "./Forgot.css";
import useInput from "../../Hooks/UserInput";
import Overlay from "react-bootstrap/Overlay";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useVerify from "../../Hooks/Verify";
import useFindEmail from "../../Hooks/FindAccount";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const { FindRequest, Message, showModal, setOtpModal, setMessage } =
    useFindEmail();
  const { VerifyOtp, Verified, wrong, setWrong } = useVerify();
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [Otp, setOtp] = useState("");
  const target = useRef(null);
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    hasError: EmailInputError,
    ValueChangeHandler: EmailChangeHandler,
    TouchHandler: emailTouch,
    BlurHandler: emailBlur,
  } = useInput((value) => value.includes("@"));
  const Submit = () => {
    setLoading(true);
    const User = {
      email: target.current.value,
    };
    if (target.current.value.length === 0) {
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
    } else {
      FindRequest(User);
    }
  };

  const onVerify = () => {
    const OTP = {
      otp: Otp,
      email: target.current.value,
    };
    VerifyOtp(OTP);
  };

  useEffect(() => {
    if (EmailInputError) setShow(true);
    else setShow(false);
  }, [EmailInputError]);

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
    if (Verified) {
      const user = {
        email: target.current.value,
      };
      localStorage.setItem("NewUser", JSON.stringify(user));
      console.log("YAYY")
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
    setOtpModal(false);
    setLoading(false);
    setMessage("");
  }, [Message, setOtpModal, setMessage]);

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

  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="Forgot_form">
          <h1>Account Recovery</h1>
          <p>
            To recover the password for your account, <br></br>please provide us
            the account details.
          </p>
          <div className="form">
            <form>
              <input
                type="email"
                placeholder="Registered Email"
                ref={target}
                value={enteredEmail}
                onChange={EmailChangeHandler}
                onFocus={emailTouch}
                onBlur={emailBlur}
              ></input>
              <Overlay
                target={target.current}
                show={show && emailTouch}
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
                    Enter a Registered Email
                  </div>
                )}
              </Overlay>
              <OtpModal
                name="Proceed"
                buttonState={!EmailInputError}
                onClick={Submit}
                onVerify={onVerify}
                setOtp={setOtp}
                show={showModal}
                Loading={isLoading}
                email={target}
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

export default Forgot;
