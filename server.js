var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
var mongo = require("mongodb");
var assert = require("assert");

var url = 'mongodb://localhost:27017/testing';

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.use(morgan("dev"));

app.post("/insert", function (req, res) {
	var data = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}

	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
		db.collection('user-data').insertOne(data, function (err, result) {
			assert.equal(null, err);
			console.log('insert-data');
			db.close();
		})
	})

});


app.get("/getData", function (req, res) {
	var data = [];
	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
		var cursor = db.collection('user-data').find();
		cursor.forEach(function (doc, err) {
			assert.equal(null, err);
			data.push(doc);
		}, function () {
			db.close();
			res.send(data);
			console.log('data-received');
		})
	})
});


app.listen(3000, function () {
	console.log("server is at 3000");
});