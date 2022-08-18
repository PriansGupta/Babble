import UserUpdate from "./Logging";
import CurrentUser from "./CurrentUser";
import UserList from "./Users";
import Room from "./Room";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  UserUpdate,
  CurrentUser,
  UserList,
  Room,
});

export default rootReducer;
