import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class sendNotification {
  /**
   * @description This helps to send email
   * @param  {object} receiver - The receiver object
   * @param  {object} message - The message object
   * @returns  {object} The message object
   */
  sendNotification(receiver, message) {
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
        text: `Hello ${receiver.user_name}
             ${message}`
      };
      return await this.sender.sendMail(this.mailOptions);
    } catch (err) {
      return err;
    }
  }
}

export default new sendNotification();
