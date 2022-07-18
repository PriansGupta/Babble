require("./Db/mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./Models/User");

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post("/SignUp", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  User.findOne({ phone: user.phone }, (err, phone) => {
    if (phone) res.send({ message: "Phone number already registered" });
    else {
      user
        .save()
        .then((User) => {
          console.log(User);
          res.send({ message: "Phone number registered" })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

app.listen(port, () => {
  console.log("Started at ", port);
});
