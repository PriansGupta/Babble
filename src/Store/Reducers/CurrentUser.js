const initialState = {
  name: "",
  id: "",
  Profile: "",
};
const CurrentUser = (state = initialState, action) => {
  switch (action.type) {
    case "OnSelect":
      return (state = action.state);
    default:
      return state;
  }
};

export default CurrentUser;
