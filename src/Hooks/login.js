import { useState } from "react";
const axios = require("axios");

const useLogin = () => {
  const [isLoggedIn, setIsLogged] = useState(false);
  const [Unable, setUnable] = useState(false);
  const LoginToAccount = (Data) => {
    axios
      .post("http://localhost:3001/Login", Data)
      .then(function (response) {
        console.log(response.data);
        setIsLogged(true);
      })
      .catch(function (error) {
        console.log(error);
        setUnable(true);
      });
  };

  return {
    LoginToAccount,
    isLoggedIn,
    Unable,
    setUnable,
    setIsLogged
  };
};
export default useLogin;
