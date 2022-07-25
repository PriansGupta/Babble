import React from "react";
import Overlay from "react-bootstrap/Overlay";

const Warning = (props) => {
  return (
    <Overlay
      target={props.target.current}
      show={props.show}
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
          {props.text}
        </div>
      )}
    </Overlay>
  );
};

export default Warning;
