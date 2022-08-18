const initialState = {
    name:""
};

const Room = (state = initialState, action) => {
  switch (action.type) {
    case "CreateRoom":
      return (state = action.state);
    default:
      return state;
  }
};

export default Room;
