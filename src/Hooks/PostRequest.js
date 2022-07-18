import { useState } from "react";
const axios = require("axios");

const usePost = () => {
  const [Message, setMessage] = useState("");
  const Request = (User) => {
    axios
      .post("http://localhost:3001/SignUp", User)
      .then(function(response) {
        console.log(response.data.message);
        setMessage(response.data.message);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return {
    Request,
    Message,
  };
};

export default usePost;
