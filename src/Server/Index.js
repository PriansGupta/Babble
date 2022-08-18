require("./Db/mongoose");
const express = require("express");
const http = require("http");
const cors = require("cors");
const User = require("./Models/User");
const SendMail = require("./Requests/SendMail");
const store = require("store2");
const otpGenerator = require("otp-generator");
const socket = require("socket.io");

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (data) => {
    onlineUsers.set(data.userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log(onlineUsers);
    console.log(data.to, data.from);
    console.log(data.message);
    console.log(sendUserSocket);
    if (sendUserSocket) {
      io.emit("msg-recieve", ({message:data.message,for:data.to}));
    }
  });
});

app.post("/EmailVerification", (req, res) => {
  User.findOne({ email: req.body.email }, (error, data) => {
    if (data) {
      res.send({ Message: "Email already registered.Try Logging in" });
      return;
    } else {
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

app.post("/FindEmail", (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (error, data) => {
    if (data) {
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      store.set("Temp", OTP);
      const Message = `Dear ${data.name},your One Time Password (OTP) for email verification is ${OTP}.Use this to Verify Your identity and change your Password`;
      SendMail({ Message: Message, Email: req.body.email }, (error, data) => {
        if (error) res.send(error);
        else res.send(data);
      });
    } else {
      res.send({ Message: "User not found" });
    }
  });
});

app.post("/Verify", (req, res) => {
  const enteredOtp = req.body.otp;
  const temp = store.get("Temp");
  if (temp == enteredOtp) res.send({ Message: "Verified" });
  else throw new Error({ Message: "Not Verified" });
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

app.patch("/ChangePassword", async (req, res) => {
  User.findOne({ email: req.body.email }, (error, data) => {
    if (data) {
      try {
        const user = User.findByIdAndUpdate(data.id, req.body, { new: true });
        console.log(user);
      } catch (e) {
        res.send(e);
      }
    }
  });
});

app.post("/Logout", (req, res) => {
  User.findOne({ email: req.body.email }, (error, data) => {
    if (data) {
      try {
        data.tokens = [];
        data.save();
        console.log("Logged Out");
        res.send(data);
      } catch (e) {
        res.send(e);
      }
    }
  });
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

server.listen(port, () => {
  console.log("Started at ", port);
});
