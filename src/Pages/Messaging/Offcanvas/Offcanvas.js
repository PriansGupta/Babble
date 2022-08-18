import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Menu } from "react-ionicons";
import "./Offcanvas.css";
import NestedList from "./Page1";
import { Route, Routes } from "react-router-dom";
import Feedback from "./Feedback";
import { Heart } from "react-ionicons";
import { NavLink } from "react-router-dom";
const options = [
  {
    scroll: false,
    backdrop: true,
  },
];

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <span onClick={toggleShow} className="me-2 menu">
        <NavLink to="/User/chats/Options">
          <Menu color="white" title="Menu" height="35px" width="35px" />
        </NavLink>
      </span>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Routes>
            <Route path="/" element={<NestedList />} />
            <Route path="/Options" element={<NestedList />} />
            <Route path="/Feedback" element={<Feedback />} />
          </Routes>
          <div className="Made_by">
            Made by <a href="https://prians-9c7e3.web.app/">Prians</a>
            <Heart color="red" height="20px" width="20px" />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const MenuOptions = () => {
  return (
    <>
      {options.map((props, idx) => (
        <OffCanvasExample key={idx} {...props} />
      ))}
    </>
  );
};

export default MenuOptions;
