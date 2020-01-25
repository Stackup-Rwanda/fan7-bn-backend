import { sequelize } from './models';
import app from './app';

const PORT = process.env.PORT || 5000;

sequelize
  .sync({
    force: false
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  });

const server = app.listen(3000);

export default server;
