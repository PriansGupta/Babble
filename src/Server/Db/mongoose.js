const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/Babble",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DataBase Connected");
  }
);
