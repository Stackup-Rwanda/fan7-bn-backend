import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import path from 'path';
import cors from 'cors';
import swagger from './swagger.json';

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/`));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/docs', serve, setup(swagger));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to barefoot nomad'
  });
});

app.use(cors());

require('./index.js')(app);

export default app;
