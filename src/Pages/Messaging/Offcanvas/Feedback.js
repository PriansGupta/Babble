import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomizedRating from "../../../Components/Rating/Rating";
import { NavLink } from "react-router-dom";
import { ArrowBack } from "react-ionicons";
import SideRoutesAnimation from "../../../Components/RoutesAnimation/SideRouteAnimations";

const Feedback = () => {
  return (
    <SideRoutesAnimation>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="Feedback">
          <TextField
            id="outlined-multiline-static"
            label="Provide your feedback"
            multiline
            rows={4}
          />
          <CustomizedRating></CustomizedRating>
          <NavLink to="/User/chats/Options">
            <button className="send">Send</button>
          </NavLink>
          <NavLink to="/User/chats/Options">
            <ArrowBack
              className="back"
              color={"#00000"}
              title="Back"
              height="35px"
              width="35px"
            />
          </NavLink>
        </div>
      </Box>
    </SideRoutesAnimation>
  );
};

export default Feedback;
