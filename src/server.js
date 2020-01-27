import app from './app';
import createAdministator from './utils/createAdministrator';

const PORT = process.env.PORT || 5000;

createAdministator();

export default app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
