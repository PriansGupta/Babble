export const LoggedIn = (props) => {
  return {
    state: {
      name: props.name,
      email: props.email,
      LoggedIn: true,
      tokens: props.tokens,
      id: props.id,
    },
    type: "LoggedIn",
  };
};
export const LoggedOut = (props) => {
  return {
    state: {
      name: props.name,
      email: props.email,
      LoggedIn: false,
      tokens: props.tokens,
    },
    type: "LoggedOut",
  };
};

export const OpenUser = (props) => {
  return {
    state: {
      name: props.name,
      id: props.id,
      Profile: props.Profile,
    },
    type: "OnSelect",
  };
};

export const AddUser = (props) => {
  return {
    state: {
      name: props.name,
      Sid: props.Sid,
    },
    type: "AddUsers",
  };
};

export const CreateRoom = (props) => {
  return {
    state: {
      name: props.name,
    },
    type: "CreateRoom",
  };
};
