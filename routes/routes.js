var express = require('express');
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var assert = require("assert");

var url = 'mongodb://localhost:27017/testing';

router.post("/insert", function (req, res) {
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


router.post("/updateData", function (req, res) {
	var data = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}
	var id = req.body.id;

	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
		db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: data}, function (err, result) {
			assert.equal(null, err);
			console.log('update-data');
			db.close();
		})
	})

});

router.post("/deleteData", function (req, res) {

	var id = req.body.id;

	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
		db.collection('user-data').deleteOne({"_id": objectId(id)}, function (err, result) {
			assert.equal(null, err);
			console.log('delete-data');
			db.close();
		})
	})

});


router.get("/getData", function (req, res) {
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




module.exports = router;