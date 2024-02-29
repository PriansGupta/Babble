import { useState } from "react";
const axios = require("axios");

const useCreateUser = () => {
  const [isLoggedIn, setIsLogged] = useState(false);

  const newAccount = (User) => {
    console.log(User);
    axios
      .post("http://localhost:3001/CreateAccount", User)
      .then(function (response) {
        console.log(response.data.Message);
        localStorage.removeItem("NewUser");
        setIsLogged(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("dsds");
  const newPassword = (User) => {
    console.log(User);
    axios
      .patch("http://localhost:3001/ChangePassword", User)
      .then(function (response) {
        console.log(response.data.Message);
        localStorage.removeItem("NewUser");
        setIsLogged(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return {
    newAccount,
    isLoggedIn,
    newPassword,
  };
};

export default useCreateUser;
