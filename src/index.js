import authentication from './routes/authentication';

export default (app) => {
  app.get('/routes', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'bro we are out here'
    });
  });

  app.use('/auth', authentication);

  app.use((req, res) => {
    const err = new Error('Page not found');
    res.status(404).json({
      status: 404,
      error: err.message,
    });
  });

  app.use((err, req, res) => {
    const status = err.status || 500;
    res.status(status).json({
      status,
      error: err.message,
    });
  });
};
