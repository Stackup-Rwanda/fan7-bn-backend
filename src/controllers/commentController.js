/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import CommentService from '../repositories/commentRepository';
import UserService from '../repositories/userRepository';

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
      const { comment } = req.body;
      const { id } = req.params;
      const user = await UserService.findByUserId(req.userData.id);
      const addedComment = await CommentService.addComment({
        user_id: user.id,
        request_id: id,
        comment
      }, {
        fields: ['user_id', 'request_id', 'comment']
      });
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
      const comments = await CommentService.getRequestCommentById(req.params.id);
      return res.status(200).json({ status: 200, message: 'Comments fetched successfully', comments });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next
   * @returns {object} object response
   */

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const commentFound = CommentService.getCommentById(id);
      if (!commentFound) {
        const response = new Response(res, 404, 'Comment not found');
        return response.sendErrorMessage();
      }
      await CommentService.deleteComment(id);
      const response = new Response(res, 200, 'comment sucessfully deleted');
      response.sendSuccessMessage();
    } catch (error) {
      return next(error);
    }
  }
}
export default CommentController;
