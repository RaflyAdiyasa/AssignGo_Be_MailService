import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import mailModel from './mail.js';
import historyModel from './history.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);

const db = {
  Mail: mailModel(sequelize),
  History: historyModel(sequelize),
  sequelize,
  Sequelize
};

// Establish relationships
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;