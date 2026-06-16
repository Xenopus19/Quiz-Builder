import app from './app.js';
import { PORT } from './config.js';
import { connectDB } from './database.js';

const main = async () => {
  await connectDB();
  app.listen(PORT);
  //eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
};

await main();
