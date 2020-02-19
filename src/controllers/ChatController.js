import model from '../models';
import { onError, onSuccess } from '../utils/response';

const { Chat } = model;
export default class ChatController {
  /**
   * @description This helps a new User to create credentials
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async saveMessage(req, res) {
    try {
      if (!req.body.message) return onError(res, 422, 'You can\'t send empty message');
      const data = {
        senderId: req.body.id,
        sender: req.body.sender,
        message: req.body.message
      };
      const send = await Chat.create(data);
      if (!send) return onError(res, 400, 'Message not sent');
      return onSuccess(res, 201, 'Message sent successfully');
    } catch (ex) {
      onError(res, 500, 'Internal Server Error');
    }
  }

  /**
   * @description This helps a new User to create credentials
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getMessages(req, res) {
    try {
      const list = await Chat.findAll({ where: { receiver: 'general' } });
      if (list.length === 0) return onError(res, 404, 'No Messages found');
      return onSuccess(res, 200, 'Messages fetched Successfully', list);
    } catch (ex) {
      onError(res, 500, 'Internal Server Error');
    }
  }
}
