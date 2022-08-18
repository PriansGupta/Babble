// import { useStore } from "react-redux";
const initialState = {
  name: "",
  email: "",
  LoggedIn: false,
  tokens: "",
  id: "",
};
const UserUpdate = (state = initialState, action) => {
  // const store = useStore();
  switch (action.type) {
    case "LoggedIn":
      return (state = action.state);
    case "LoggedOut":
      return (state = action.state);
    default:
      return state;
  }
};

export default UserUpdate;
