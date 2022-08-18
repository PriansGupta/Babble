const initialState = [{}];

const UserList = (state = initialState, action) => {
  // const store = useStore();
  const NewUsers = [...state, action.state];
  switch (action.type) {
    case "AddUsers":
      return (state = [...NewUsers]);
    default:
      return state;
  }
};

export default UserList;
