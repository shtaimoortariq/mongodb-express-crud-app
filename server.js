var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");

var routes = require("./routes/routes.js");


var app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use('/', routes);

app.listen(3000, function () {
	console.log("server is at 3000");
});