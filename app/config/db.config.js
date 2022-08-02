module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "wjstjrn00",
  DB: "serp_db",
  dialect: "mysql",
  timezone: "+09:00", // DB에 저장할 때 시간 설정
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};