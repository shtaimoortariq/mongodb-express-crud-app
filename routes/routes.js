var express = require('express');
var router = express.Router();

var schema = require("../schema");
var insertData = schema.insertData;

router.post("/insert", function (req, res) {
    new insertData({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })

        .save(function (err, doc) {
            if (err) res.json(err);
            else res.send('insert-data');
        })
});


router.post("/updateData", function (req, res) {

    var id = req.body.id;

    insertData.findById(id, function (err, doc) {
        if (err) {
            console.log("Error: no result found");
        }

        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
    });
});

router.post("/deleteData", function (req, res) {

    var id = req.body.id;
    insertData.findByIdAndRemove(id).exec();
});


router.get("/getData", function (req, res) {

    insertData.find()
        .then(function (doc) {
            res.send(doc);
            console.log('data-received');
        });

});

module.exports = router;