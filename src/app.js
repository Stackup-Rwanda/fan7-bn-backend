import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'welcome to barefoot nomad',
    });
});

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        status,
        error: err.message,
    });

});

export default app;
