export default {
  development: {
    username: 'ssigngo_user',
    password: 'pass123',
    database: 'assigngo',
    host: '146.148.108.234',
    dialect: 'mysql'
  },
  test: {
    username: 'ssigngo_user',
    password: 'pass123',
    database: 'assigngo',
    host: '146.148.108.234',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};