const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Sz123@po",
  database: "mamuth",
});

//connect to db
db.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("MySQL connection OK");
});

//          create db
app.get("/api/createDB/:name", (req, res) => {
  const sqlQuery = `CREATE SCHEMA ${req.params.name}`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send("Database created...");
  });
});

//            create table
app.get("/api/createTable", (req, res) => {
  let sqlTable =
    "CREATE TABLE mamuth.posting (id INTEGER, name TEXT NOT NULL, last TEXT NOT NULL);";
  db.query(sqlTable, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    console.log(result);
    res.send("table created...OK");
  });
});

// input data in table
app.post("/api/addData", (req, res, next) => {
  let entry = {
    movieName: req.body.movieName,
    movieComment: req.body.movieComment,
  };
  let post = {
    movieName: `${entry.movieName}`,
    movieComment: `${entry.movieComment}`,
  };
  let sql = "INSERT INTO mamuth.testingapi SET ?";
  let sqlQuery = db.query(sql, post, (err, result) => {
    if (err) console.log(err.message);
    console.log(sqlQuery);
    res.send("Data entered OK");
    res.render(sqlQuery);
  });
});

//get all info from db
app.get("/api/getAll", function (req, res) {
  let dbAll = "SELECT * FROM mamuth.testingapi;";
  db.query(dbAll, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    console.log(result);
    res.send(result);
  });
});

//get one from db
app.get("/api/getAll/:id", function (req, res) {
  let dbAll = `SELECT * FROM mamuth.testingapi WHERE id= ${req.params.id};`;
  db.query(dbAll, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    // console.log(result);
    res.send(result);
  });
});
//post from frontend
// app.post("/api/insert", async (req, res) => {
//   let { name } = req.body.name;
//   console.log(name);
// });
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieComment = req.body.movieComment;

  const sqlInsert =
    "INSERT INTO mamuth.testingapi (movieName, movieComment) VALUES (?,?);";
  db.query(sqlInsert, [movieName, movieComment], (err, result) => {
    if (err) console.log(err.message);
    else console.log("Status 200, OK");
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`Running server on port ${PORT}`);
});
