/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import CommentService from '../repositories/commentRepository';
import UserService from '../repositories/userRepository';
import RequestService from '../repositories/requestRepository';
import { eventEmitter } from '../utils/event.util';

class CommentController {
  /**
   * Creates a new comment.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response object
   */
  static async addComment(req, res, next) {
    try {
      const { userData } = req;
      const { comment } = req.body;
      const requestID = Number(req.params.id);
      const requestExists = await RequestService.findRequestById(requestID);
      if (!requestExists) {
        const response = new Response(res, 404, 'Request is not found to add a comment');
        return response.sendErrorMessage();
      }
      const user = await UserService.findByUserId(userData.id);
      const addedComment = await CommentService.addComment({
        user_id: user.id,
        request_id: requestID,
        comment
      }, {
        fields: ['user_id', 'request_id', 'comment']
      });

      const notification = {
        eventType: 'commented_request',
        requestId: requestID,
        role: userData.role
      };

      eventEmitter.emit('notification', notification);

      const response = new Response(res, 201, 'comment sucessfully created', addedComment);
      response.sendSuccessResponse();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets all comments by request
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response
   */
  static async getCommentsByRequest(req, res, next) {
    try {
      const requestID = Number(req.params.id);
      const requestExists = await RequestService.findRequestById(requestID);
      if (!requestExists) {
        const response = new Response(res, 404, 'Request is not found');
        return response.sendErrorMessage();
      }
      const comments = await CommentService.getCommentsByRequest(req.params.id);
      return res.status(200).json({ status: 200, message: 'Comments fetched successfully', comments });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * delete comment by request
   * @param {object} req request
   * @param {object} res response
   * @param {object} next
   * @returns {object} object response
   */

  static async deleteComment(req, res, next) {
    try {
      const commentID = Number(req.params.id);
      const commentFound = await CommentService.getCommentById(commentID);
      if (!commentFound) {
        const response = new Response(res, 404, 'Comment not found');
        return response.sendErrorMessage();
      }
      const commentDeleted = await CommentService.deleteComment(commentID);
      if (!commentDeleted) {
        const response = new Response(res, 400, 'Error deleting the comment');
        return response.sendErrorMessage();
      }
      const response = new Response(res, 200, 'comment sucessfully deleted');
      response.sendSuccessMessage();
    } catch (error) {
      return next(error);
    }
  }
}
export default CommentController;
