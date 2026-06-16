import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config.js';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_URL || './database.sqlite', 
  logging: false, 
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};