import models from '../models';

const { sequelize } = models;

class RequestServices {
  /** Function to search according to what the user is typing
   * @param {string} searching the query passed in the query params
   * @param {integer} offset the offset to know how to divide pages
   * @returns {object} found data
   */
  static async search(searching) {
    const searchArray = await sequelize.query(
      'SELECT "Users".*,"Requests".* FROM "Requests" JOIN "Users" ON ("Requests".user_id = "Users".id) WHERE origin LIKE :searching OR status LIKE :searching OR EXISTS(SELECT 1 FROM unnest(destination) AS ip WHERE ip LIKE :searching) OR EXISTS(SELECT 1 FROM unnest(travel_date) AS ip WHERE ip LIKE :searching);',
      {
        replacements: { searching: `%${searching}%` }
      }
    );

    return searchArray[0];
  }
}

export default RequestServices;
