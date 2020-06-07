module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "ajay1234",
  DB: "taskManagement",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
