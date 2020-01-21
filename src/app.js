import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import { serve, setup } from 'swagger-ui-express';
import swagger from './swagger.json';

const app = express();

app.use('/docs', serve, setup(swagger));
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
