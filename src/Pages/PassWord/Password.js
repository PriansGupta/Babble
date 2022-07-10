import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Eye } from "react-ionicons";
import { EyeOff } from "react-ionicons";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import "./Password.css";

const Password = () => {
  const [hide, setHide] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const HideToggle = () => {
    if (!hide) setPasswordType("password");
    else setPasswordType("Text");
    setHide(!hide);
  };
  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="Password_form">
          <h1>Create your Password</h1>
          <div className="form">
            <form>
              <input type={passwordType} placeholder="Password"></input>
              <input type={passwordType} placeholder="Confirm Password"></input>
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
    </RoutesAnimation>
  );
};

export default Password;
