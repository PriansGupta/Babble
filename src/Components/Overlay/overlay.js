import React, { useState, useRef, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const OverLay = (props) => {
  const [show, setShow] = useState(false);
  
  useEffect(()=>{
      if(props.display)
      setShow(!show);
  },[])
  return (
    <Overlay target={props.target.current} show={show} placement="right">
      {(props) => (
        <Tooltip id="overlay-example" {...props}>
          My Tooltip
        </Tooltip>
      )}
    </Overlay>
  );
};

export default OverLay;
