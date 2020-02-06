import authentication from './routes/authentication';
import profile from './routes/profile.route';
import notification from './routes/notification.route';
import requests from './routes/requests';
import request from './routes/request.route';

export default (app) => {
  app.use('/api/auth', authentication);
  app.use('/api/profile', profile);
  app.use('/api/notifications', notification);
  app.use('/api/requests', requests);
  app.use('/api/request', request);
  app.use('/api/requests', request);

  app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    res.json({
      status,
      error: error.message,
    });
  });
};
