/* eslint-disable camelcase */
/* eslint-disable no-useless-catch */
import database from '../models';

const { Comment } = database;

class CommentRepository {
  /**
   * Creates a new comment.
   * @param {object} comment .
   * @returns {object} comment.
   */
  static async addComment({ comment, user_id, request_id }) {
    try {
      return await Comment.create({
        user_id,
        request_id,
        comment
      }, {
        fields: ['user_id', 'request_id', 'comment']
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comment by id.
   * @param {object} id .
   * @returns {object} comment object.
   */
  static async getCommentsByRequest(id) {
    try {
      return await Comment.findAll({
        where: { request_id: id }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comment by id.
   * @param {object} id .
   * @returns {object} comment object.
   */
  static async getCommentById(id) {
    try {
      return await Comment.findOne({
        where: [
          {
            id,
            // deleted: false
          }
        ],
      // attributes: ['id', 'user_id', 'request_id', 'comment', 'createdAt', 'updatedAt', 'deleted']
      });
    } catch (error) {
      throw (error);
    }
  }
  /**
   * Gets comment by id.
   * @param {object} id .
   * @returns {object} delete object.
   */

  static async deleteComment(id) {
    try {
      return await Comment.destroy({
        where: [{ id }]
      });
    } catch (error) {
      throw error;
    }
  }
}
export default CommentRepository;
