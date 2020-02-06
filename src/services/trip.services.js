import { Op } from 'sequelize';
import models from '../models';

const { Request } = models;
const { User } = models;

class RequestServices {
  /** Function to search according to what the user is typing
   * @param {string} searching the query passed in the query params
   * @param {integer} offset the offset to know how to divide pages
   * @returns {object} found data
   */
  static async search(searching) {
    const searchArray = await Request.findAll({
      where: {
        [Op.or]: [
          {
            [Op.or]: ['origin', 'destination', 'status'].map(key => ({
              [key]: {
                [Op.like]: `%${searching}%`
              },
            }))
          }
        ]
      },
      include: [{ model: User }]
    });
    return searchArray;
  }
}

export default RequestServices;
