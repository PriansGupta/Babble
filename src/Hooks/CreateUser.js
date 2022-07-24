import { useState } from "react";
const axios = require("axios");

const useCreateUser = () => {  
  const [isLoggedIn, setIsLogged] = useState(false);

  const newAccount = (User) => {
    console.log(User);
    axios
      .post("http://localhost:3001/CreateAccount", User)
      .then(function(response) {
        console.log(response.data.Message);
        localStorage.removeItem("NewUser");
        setIsLogged(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return {
    newAccount,
    isLoggedIn
  };
};

export default useCreateUser;
