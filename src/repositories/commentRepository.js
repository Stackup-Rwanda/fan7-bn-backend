/* eslint-disable no-useless-catch */
import database from '../models';

const { Comment } = database;

class CommentRepository {
  /**
   * Creates a new comment.
   * @param {object} data .
   * @returns {object} comment.
   */
  static async addComment(data) {
    try {
      return await Comment.create(data, {
        fields: ['user_id', 'request_id', 'comment']
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update a comment
   * @param {object} id The id of the comment
   * @param {object} comment The new comment
   * @returns {object} The response object.
   */
  static async updateComment(id, comment) {
    try {
      const result = await Comment.update(comment, {
        returning: true,
        where: [{ id }]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comments belonged to a user.
   * @param {object} id
   * @returns {object} comment object.
   */
  static async getCommentsByRequest(id) {
    try {
      return await Comment.findAll({
        where: { request_id: id },
        order: [
          ['createdAt', 'DESC'],
        ]
      });
    } catch (error) {
      throw new Error(error);
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
          }
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Gets comment owner.
   * @param {object} requestId .
   * @returns {object} comment object.
   */
  static async getCommentOwnerById(requestId) {
    try {
      return await Comment.findOne({
        where: [
          {
            request_id: requestId,
          }
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {string} id the id of the travel request
   * @returns {string} the id of the owner of the request
   */
  static async findRequestOwnerId(id) {
    try {
      const result = await Comment.findAll({ where: { user_id: id } });
      return result;
    } catch (error) {
      throw error;
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
      throw new Error(error);
    }
  }
}
export default CommentRepository;
