import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LockClosed } from "react-ionicons";
import { LogOut } from "react-ionicons";
import { ChatboxEllipses } from "react-ionicons";
import { InformationCircle } from "react-ionicons";
import { NavLink } from "react-router-dom";
import RoutesAnimation from "../../../Components/RoutesAnimation/RoutesAnimation";

export default function NestedList() {
  return (
    <RoutesAnimation>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton style={{ marginTop: "10px" }}>
          <ListItemIcon>
            <LockClosed
              color="green"
              title="Change Password"
              height="25px"
              width="25px"
            />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItemButton>
        <ListItemButton style={{ marginTop: "10px" }}>
          <ListItemIcon>
            <LogOut
              color={"#00000"}
              title="Logout"
              height="25px"
              width="25px"
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
        <ListItemButton style={{ marginTop: "10px" }}>
          <ListItemIcon>
            <InformationCircle
              color={"#00000"}
              title="About"
              height="25px"
              width="25px"
            />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
        <NavLink to="/User/chats/Feedback" className="navFeed">
          <ListItemButton style={{ marginTop: "10px" }}>
            <ListItemIcon>
              <ChatboxEllipses
                color={"#00000"}
                title="Feedback"
                height="25px"
                width="25px"
                // shake
              />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItemButton>
        </NavLink>
      </List>
    </RoutesAnimation>
  );
}
