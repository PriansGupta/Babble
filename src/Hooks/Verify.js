import { useState } from "react";
const axios = require("axios");

const useVerify = () => {
  const [Verified, setVerified] = useState(false);
  const [wrong, setWrong] = useState("");
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
        setWrong("OTP Invalid")
      });
  };

  return {
    VerifyOtp,
    Verified,
    wrong,
    setWrong
  };
};
export default useVerify;
