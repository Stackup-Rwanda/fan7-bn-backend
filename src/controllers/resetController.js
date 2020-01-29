import notifications from '../services/notifications';
import models from '../models';


const { User } = models;
class resetController {
  /**
   * @description This is a function for sending email to a user with an account
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async forgetPassword(req, res) {
    const exist = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!exist) {
      return res.status(404).json({
        status: 404,
        error: 'Looks like there is no account associated with your Email',
      });
    }
    const hashPsw = exist.password;
    const url = `http://localhost:5000/auth/reset/${hashPsw}`;
    const message = `You requested a password reset, click on this link ${url} to reset password.`;
    notifications.sendEmail(exist, message);
    return res.status(200).json({
      status: 200,
      message: 'Link to reset password is sent to your email',
    });
  }
}

export default resetController;
