const axios = require("axios");

const useLogout = () => {
  // console.log(UserData);
  const LogOutAccount = (Data) => {
    // console.log(Data);
    const User = {
      name: Data.name,
      email: Data.email,
      token: Data.token,
    };
    axios
      .post("http://localhost:3001/Logout", User)
      .then(function (response) {
        // console.log(response.data);
        console.log("Logged out");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return {
    LogOutAccount,
  };
};
export default useLogout;
