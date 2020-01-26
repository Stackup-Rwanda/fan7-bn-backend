import { sequelize } from './models';
import app from './app';

const PORT = process.env.PORT || 5000;

let server;
sequelize
  .sync({
    force: false
  })
  .then(() => {
    server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  });


export default server;
