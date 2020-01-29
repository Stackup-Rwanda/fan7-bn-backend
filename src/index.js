import authentication from './routes/authentication';

export default (app) => {
  app.use('/api/auth', authentication);

  app.use((req, res) => {
    const err = new Error('Page not found');
    res.status(404).json({
      status: 404,
      error: err.message
    });
  });
};
