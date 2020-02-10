import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Mailer {
  constructor(subject, { user_name: userName, email }, message, url) {
    this.userName = userName;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.url = url;
  }

  async sendMail() {
    const emailView = `<!DOCTYPE html>
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
                    <p>Hello ${this.userName}!</p><br>
                    <p>${this.message}</p>
                </div>
            </div>
            <a href=${this.url}>
                <button class="EmailView-btn">Show Notification</button>
            </a>
        </div>
    </body>
    
    </html>`;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      const messageObj = {
        from: `Barefoot Nomad ${process.env.EMAIL}`,
        to: this.email,
        subject: this.subject,
        html: emailView
      };

      await transporter.sendMail(messageObj);
      transporter.close();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Mailer;
