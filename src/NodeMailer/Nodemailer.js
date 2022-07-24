// const nodemailer = require("nodemailer");

// const useSendOtp = () => {

//   const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//       user: "babble@outlook.in",
//       pass: "Jc6dvfqy1@",
//     },
//   });

//   const SendOtp = (User) => {
//     console.log(User)
//     const options = {
//       from: "babble@outlook.in",
//       to: "priyanshgupta.org@gmail.com",
//       subject: "YOUR EMAIL VERIFICATION",
//       text: "Your one time password is 123456",
//     };

//     transporter.sendMail(options, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Mail Sent", info.response);
//       }
//     });
//   };

//   return{
//     SendOtp
//   }
// };
// module.exports=useSendOtp