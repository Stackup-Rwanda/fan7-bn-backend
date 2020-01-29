import Promise from 'bluebird';
import dotenv from 'dotenv';
import hashPassword from '../utils/hash';

import models from '../models';

const { sequelize, User } = models;

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
            await User.create({
              user_name: user.user_name,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              password: await hashPassword(user.password),
              role: user.role
            });
          }
        })
      );
    });
};

export default createAdministator;
