const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// 정적(static) 파일 경로 설정
const app = express();
app.use(express.static("./app/uploads"))

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
  ]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api server11" });
});


// 미들웨어
 require('./app/routes/account.route')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});

