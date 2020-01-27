import Promise from 'bluebird';
import dotenv from 'dotenv';

import { sequelize, User } from '../models';

dotenv.config();

const users = process.env.USERS ? JSON.parse(process.env.USERS) : [];

const createAdministator = () => {
  sequelize
    .sync({
      force: false
    }).then(async () => {
      await Promise.all(
        users.map(async (user) => {
          const exist = await User.findOne({
            where: {
              email: user.email
            }
          });
          if (!exist) {
            await User.create(user);
          }
        })
      );
    });
};

export default createAdministator;
