import { useState } from "react";
const axios = require("axios");

const useLogin = () => {
  const [isLoggedIn, setIsLogged] = useState(false);
  const [Unable, setUnable] = useState(false);
  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    tokens: "",
    id: "",
  });
  // console.log(UserData);
  const LoginToAccount = (Data) => {
    axios
      .post("http://localhost:3001/Login", Data)
      .then(function (response) {
        // console.log(response.data);
        setUserData({
          name: response.data.name,
          email: response.data.email,
          tokens: response.data.tokens[0].token,
          id: response.data._id,
        });
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
    setIsLogged,
    UserData,
  };
};
export default useLogin;
