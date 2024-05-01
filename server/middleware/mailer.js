const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.MAILER_AUTH_USER_NAME,
        pass:process.env.MAILER_AUTH_PASSWORD
    }
});

const mail = {
    from:"eyall11223@gmail.com",
    to:"www.yosi@gmail.com",
    subject:"good yossi",
    html:`<h1>hello yossi</h1>
    <p>welcome to mego project we love you</p>
    <img src="" />
    `
  }




module.exports = {transporter , mail };