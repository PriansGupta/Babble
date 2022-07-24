const nodemailer = require("nodemailer");

const SendMail = (Data, callback) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "babble@outlook.in",
      pass: "Jc6dvfqy1@",
    },
  });

  const options = {
    from: "babble@outlook.in",
    to: `${Data.Email}`,
    subject: `Welcome to our World!`,
    text: `${Data.Message}`,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      callback(error, undefined);
    } else {
      console.log(`Mail Sent Successfully`, info.response);
      callback(undefined, {Message:"Message sent succesfully"});
    }
  });
};

module.exports = SendMail;
