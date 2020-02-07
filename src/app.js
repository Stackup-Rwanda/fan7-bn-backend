import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import path from 'path';
import swagger from './swagger.json';

dotenv.config();

const app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/`));
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/docs', serve, setup(swagger));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to barefoot nomad'
  });
});

require('./index.js')(app);

export default app;
