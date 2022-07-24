import { useState } from "react";
const axios = require("axios");

const useVerify = () => {
  const [Verified, setVerified] = useState(false);
  const VerifyOtp = (Otp) => {
    axios
      .post("http://localhost:3001/Verify", Otp)
      .then(function(response) {
        if (response.data.Message === "Verified") setVerified(true);
        console.log(response.data.Message);
        const user = JSON.parse(localStorage.getItem('NewUser'));
        console.log(user)
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return {
    VerifyOtp,
    Verified,
  };
};
export default useVerify;
