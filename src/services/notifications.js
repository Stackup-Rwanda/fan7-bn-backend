import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class sendNotification {
  /**
   * @description This helps to send email
   * @param  {object} receiver - The receiver object
   * @param  {string} url - The message object
   * @returns  {object} The message object
   */
  sendNotification(receiver, url) {
    const message = `<!DOCTYPE html>
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
                    <p>Hello ${receiver.user_name}!</p><br>
                    <p>Welcome to Barefoot Nomad</p>
                    <p>You are requesting a password reset.</p>
                    <p>Click on the following link, to reset your password.</p>
                </div>
            </div>
            <a href="${url}">
                <button class="EmailView-btn">Reset password</button>
            </a>
        </div>
    </body>
    
    </html>`;
    this.sendEmail(receiver, message);
  }

  /**
   * @description This is a function for sending email
   * @param  {object} receiver - The receiver object
   * @param  {object} message - The message object
   * @returns  {object} The message object
   */
  async sendEmail(receiver, message) {
    try {
      this.sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EPASS
        },
      });

      this.mailOptions = {
        from: `Barefoot Nomad ${process.env.EMAIL}`,
        to: receiver.email,
        subject: 'Barefoot Nomad Password Reset',
        html: message
      };
      return await this.sender.sendMail(this.mailOptions);
    } catch (err) {
      return err;
    }
  }
}

export default new sendNotification();
