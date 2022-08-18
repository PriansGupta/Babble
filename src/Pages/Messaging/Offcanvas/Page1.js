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
import useLogout from "../../../Hooks/logout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoggedOut } from "../../../Store/Actions";
import { useNavigate } from "react-router-dom";
import socketIo from "socket.io-client";

export default function NestedList() {
  let socket;
  const ENDPOINT = "http://localhost:3001";
  const { LogOutAccount } = useLogout();
  const myState = useSelector((state) => state.UserUpdate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    let UserData = {
      name: myState.name,
      email: myState.email,
      LoggedIn: false,
      token: myState.tokens,
    };
    // console.log(UserData);
    UserData.token = "";
    LogOutAccount(UserData);
    navigate("/Homepage", { replace: true });
    dispatch(LoggedOut(UserData));
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.emit("disconnect");
    
    // console.log("Logout");
  };

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
        <ListItemButton onClick={LogoutHandler} style={{ marginTop: "10px" }}>
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
