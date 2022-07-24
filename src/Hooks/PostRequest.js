import { useState } from "react";
const axios = require("axios");

const usePost = () => {
  const [Message, setMessage] = useState("");
  const [showModal, setOtpModal] = useState(false);

  const Request = (User) => {
    axios
      .post("http://localhost:3001/EmailVerification", User)
      .then(function(response) {
        const res = response.data.Message;
        console.log(res);
        if (res === "Message sent succesfully") setOtpModal(true);
        setMessage(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return {
    Request,
    Message,
    showModal,
  };
};

export default usePost;
