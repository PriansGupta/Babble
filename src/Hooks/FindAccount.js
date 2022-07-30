import { useState } from "react";
const axios = require("axios");

const useFindEmail = () => {
  const [Message, setMessage] = useState("");
  const [showModal, setOtpModal] = useState(false);

  const FindRequest = (User) => {
    axios
      .post("http://localhost:3001/FindEmail", User)
      .then(function (response) {
        const res = response.data.Message;
        console.log(res);
        if (res === "Message sent succesfully") setOtpModal(true);
        setMessage(response.data.Message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return {
    FindRequest,
    Message,
    showModal,
    setOtpModal,
    setMessage
  };
};

export default useFindEmail;
