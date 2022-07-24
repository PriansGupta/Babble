require("./Db/mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./Models/User");
const SendMail = require("./Requests/SendMail");
const store = require("store2");
const otpGenerator = require("otp-generator");
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/EmailVerification", (req, res) => {
  console.log(req.body, "This is from Index.js");
  User.findOne({ email: req.body.email }, (error, data) => {
    if (data) res.send({ Message: "Email already registered" });
    else {
      if (req.body.email && req.body.name) {
        const OTP = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        store.set("Temp", OTP);
        const Message = `Dear ${req.body.name},your One Time Password (OTP) for email verification is ${OTP}.Use this to verify your email and create a new account on Babble.`;

        SendMail({ Message: Message, Email: req.body.email }, (error, data) => {
          if (error) res.send(error);
          else res.send(data);
        });
      } else {
        res.send({ Message: "Enter Valid Details" });
      }
    }
  });
});

app.post("/Verify", (req, res) => {
  const enteredOtp = req.body.otp;
  const temp = store.get("Temp");
  if (temp == enteredOtp) res.send({ Message: "Verified" });
  else res.send({ Message: "Not Verified" });
});

app.post("/CreateAccount", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  console.log(user);
  User.findOne({ email: user.email }, (error, data) => {
    if (data) res.send({ Message: "Email already registered" });
    else {
      user.save();
      res.send({ Message: "Account Created Successfully" });
    }
  });
});

app.post("/Login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    console.log("Logged in");
    res.send(user);
  } catch (e) {
    res.status(400).send({ Message: "Unable to login" });
  }
});

app.listen(port, () => {
  console.log("Started at ", port);
});
