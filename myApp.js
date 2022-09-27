let express = require('express');
let app = express();
let bodyparser = require('body-parser')
require('dotenv').config();





console.log("Hello World");

app.use(bodyparser.urlencoded({extended: false}))

app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({time: req.time});
});

app.get("/:word/echo", (req, res) => {
    res.send({"echo": req.params.word});
});

app.get("/name", (req, res) => {
    res.send({"name": `${req.query.first} ${req.query.last}`});
});

app.post("/name", (req, res) => {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});



 module.exports = app;
