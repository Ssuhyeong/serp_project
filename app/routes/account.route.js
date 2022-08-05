const controller = require("../controllers/account.controller");
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );


    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // 미들웨어
  app.get("/api/signIn", controller.signIn);
  app.post("/api/signUp", controller.signUp);
};
