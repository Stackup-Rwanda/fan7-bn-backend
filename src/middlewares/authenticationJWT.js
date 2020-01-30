import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jsonwebtoken.verify(authorization, process.env.KEY, (err, token) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          error: `failed to authanticate authorization token: ${err}`
        });
      }
      req.token = token;
      next();
    });
  } else {
<<<<<<< HEAD
    return res.status(401).json({
=======
    res.status(401).json({
>>>>>>> ft(server): assign role
      status: 401,
      error: 'please provide token'
    });
  }
};
