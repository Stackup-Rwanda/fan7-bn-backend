import nodemailer from 'nodemailer';

const dotenv = require('dotenv');

dotenv.config();


class SendMailer {
  /**
       * Send a user an email verificatoin link
       * @param {object} req a request object
       * @param {String} token a userName of the user registered
       * @param {String} userName a userName of the user registered
       * @returns {Object} An email template containing the message of the user
       */
  static confirm(req, token, userName) {
    const url = `${req.headers.host}/api/auth/confirmation/${token}`;
    const emailViewer = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    .EmailView-wrapper {
        display: grid;
        width: 50%;
        max-height: 600px;
        margin: 10px;
        margin-left: 20%;
        margin-top: 3%;
    }

    .EmailView-log {
        justify-self: start;
        margin: 10px;
        margin-left: 33px;
    }

    .EmailView-btn {
        width: 30%;
        background: #2681FF;
        border-radius: 10px;
        color: white;
        padding: 5px;
        font-size: 18px;
        cursor: pointer;
        margin-top: 20px;
        margin-left: 45px;
        text-decoration: none;
    }

    .EmailView-btn:hover {
        background: white;
        color: #2681FF;
    }

    .EmailView-message {
        align-self: center;
        margin-top: -20px;
        margin-left: 45px;
        color: black;
        font-size: 20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

</style>
</head>

<body>
    <div class="EmailView-wrapper">
        <div class="EmailView-log">
            <img src="https://res.cloudinary.com/skemc/image/upload/v1580379073/bare_mdik8n.png" />
        </div>
        <div class="EmailView-body">
            <div class="EmailView-message">
                <p>Hello ${userName}!</p><br>
                <p>Welcome to Barefoot Nomad</p>
                <p>Let's confirm your email address.</p>
                <p>By clicking on the following link, you are confirming your email address.</p>
            </div>
        </div>
        <a href="${url}">
            <button class="EmailView-btn">Confirm Email Address</button>
        </a>
    </div>
</body>

</html>`;
    return emailViewer;
  }

  /**
     * This function helps to send email
     * @param {string} to this is a receiver email
     * @param {string} subject this is the subject of email to be send
     * @param {string} emailViews this is html tages  that make body of email
     * @returns {null} return nothing
     */
  static async sendEmail(to, subject, emailViews) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    });

    const mailOptions = {
      from: `Barefoot Nomad ${process.env.EMAIL}`,
      to,
      subject,
      html: emailViews
    };
    await transporter.sendMail(mailOptions);
  }
}
export default SendMailer;
