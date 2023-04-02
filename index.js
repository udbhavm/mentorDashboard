const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const app = express();
const port = 8000;

var studentsList = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mywebapp",
});

con.connect();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/addStudents", function (req, res) {
    var sql = "select * from students";
    con.query("SELECT * FROM students", function (err, result) {
        if (err) throw err;

        var row = [];
        for (var i = 0; i < result.length; i++) {
            row.push(result[i].name);
        }
        //console.log(row);
        res.render("addMarks", { listItem: row });
    });
});

app.get("/assignMarks", function (req, res) {
    var sql = "select * from students where addedCheck = 1";
    con.query(sql, function (err, result) {
        if (err) throw err;

        var row = [];
        for (var i = 0; i < result.length; i++) {
            row.push(result[i].name);
        }
        //console.log(row);
        res.render("assignMarks", { listItem: row });
    });
});

app.get("/saveMarks", function (req, res) {
    var names = [];
    var ma1 = [];
    var ma2 = [];
    var ma3 = [];

    res.render("saveMarks", {
        name: names,
        mar1: ma1,
        mar2: ma2,
        mar3: ma3,
    });
});

app.post("/saveMarks", function (req, res) {
    var filter = req.body.filter;
    var sql;

    if (filter == "unassigned") {
        sql = "SELECT * FROM students WHERE marksAdded is NULL";
    } else if (filter == "assigned") {
        sql = "SELECT * FROM students WHERE marksAdded is NOT NULL";
    } else {
        sql = "SELECT * FROM students";
    }

    //console.log(sql);

    con.query(sql, function (error, results, fields) {
        if (error) throw error;

        var names = [];
        var ma1 = [];
        var ma2 = [];
        var ma3 = [];
        for (var i = 0; i < results.length; i++) {
            names.push(results[i].name);
            ma1.push(results[i].viva);
            ma2.push(results[i].execution);
            ma3.push(results[i].ideation);
        }

        res.render("saveMarks", {
            name: names,
            mar1: ma1,
            mar2: ma2,
            mar3: ma3,
        });
    });
});

app.post("/addClick", function (req, res) {
    var n = req.body.name;

    var sql = "UPDATE students SET addedCheck = 1 WHERE name = ?";
    con.query(sql, [n], function (err, result) {
        if (err) throw err;
    });
});
app.post("/removeClick", function (req, res) {
    var n = req.body.name;
    console.log(n);

    var sql = "UPDATE students SET addedCheck = 0 WHERE name = ?";
    con.query(sql, [n], function (err, result) {
        if (err) throw err;
    });
});

app.post("/add-student", function (req, res) {
    // Get the form data from the  request body
    const item = req.body;

    // console.log(item.name);
    // console.log(item.marks1);
    // console.log(item.marks2);
    // console.log(item.marks3);

    var n = item.name;
    const m1 = item.marks1;
    const m2 = item.marks2;
    const m3 = item.marks3;

    const sql =
        "UPDATE students SET viva = ?, Execution = ?, ideation = ? WHERE name = ?";
    con.query(sql, [m1, m2, m3, n], function (err, result) {
        if (err) throw err;
        res.send(`1 record inserted with ID: ${result.insertId}`);
    });

    // Close the database connection
    // con.end();
});

// Start server
app.listen(8000, function () {
    console.log("Server listening on port " + port);
});
