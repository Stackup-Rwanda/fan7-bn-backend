/* eslint-disable class-methods-use-this */
import { onError, onSuccess } from '../utils/response';
import CommentService from '../repositories/commentRepository';
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
      const { id: userId } = req.userData;
      const requestID = Number(req.params.id);
      const requestExists = await RequestService.findRequestById(requestID);
      if (!requestExists) {
        return onError(res, 404, 'Request is not found to add a comment');
      }
      const { id: requestOwner } = await CommentService.findRequestOwnerId(requestID);

      if (requestOwner === userId) {
        return onError(res, 404, 'You are not authorized to post on your request');
      }
      const addedComment = await CommentService.addComment({
        user_id: userId,
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

      return onSuccess(res, 201, 'comment sucessfully created', addedComment);
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
      const { id: userId, role } = req.userData;
      const requestID = Number(req.params.id);
      const request = await RequestService.findRequestById(requestID);
      if (!request) {
        return onError(res, 404, 'Request is not found');
      }
      const comments = await CommentService.getCommentsByRequest(req.params.id);
      if (comments.length === 0) {
        return onError(res, 404, 'No comment(s) found for this request');
      }
      if (request.user_id !== userId && role !== 'super-administrator' && role !== 'manager') {
        return onError(res, 404, 'You are not authorized to view this comment(s)');
      }
      return onSuccess(res, 200, 'Comments fetched successfully', comments);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * updates a comment
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next next
   * @returns {object} response object.
   */
  static async updateComment(req, res, next) {
    try {
      const { id: userId } = req.userData;
      const commentID = Number(req.params.id);
      const comment = await CommentService.getCommentById(commentID);
      if (!comment) {
        return onError(res, 404, 'Comment not found');
      }
      if (comment.user_id !== userId) {
        return onError(res, 404, 'This comment does not belong to you');
      }
      const result = await CommentService.updateComment(commentID, req.body);
      if (result) {
        return onSuccess(res, 200, 'Comment updated successfully', result);
      }
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
      const { id: userId } = req.userData;
      const commentID = Number(req.params.id);
      const comment = await CommentService.getCommentById(commentID);
      if (!comment) {
        return onError(res, 404, 'Comment not found');
      }
      if (comment.user_id !== userId) {
        return onError(res, 404, 'This comment does not belong to you ');
      }
      const result = await CommentService.deleteComment(commentID);
      if (result) {
        return onSuccess(res, 200, 'comment sucessfully deleted');
      }
    } catch (error) {
      return next(error);
    }
  }
}
export default CommentController;
