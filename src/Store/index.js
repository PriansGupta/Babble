const redux=require("react-redux")

const UserUpdate = (state = { email: "", name: "" }, action) => {
  return {
    email: state.email,
    name: state.name,
  };
};

const store = redux.createStoreHook(UserUpdate);

const UserUpdateSubscribe = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.Subscribe(UserUpdateSubscribe);
