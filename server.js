var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a publicb directory to host static content
app.use(express.static(__dirname + '/public'));
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({
    secret: process.env.SESSION_SECRET || "I am a walrus",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require("./test/app.js")(app);
require("./assignment/app.js")(app);
require("./project/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);

