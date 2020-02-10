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
   * Gets comment by id.
   * @param {object} id .
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
