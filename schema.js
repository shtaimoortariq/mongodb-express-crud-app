/**
 * Created by Taimoor on 8/19/2016.
 */


var mongoose = require('mongoose');

mongoose.connect('localhost:27017/testing');

var checkConnection = mongoose.connection;
checkConnection.on('error', console.error.bind(console, 'connection error:'));


var insertSchema = new mongoose.Schema({
    title  : {type : String, required: true},
    content: {type : String, required: true},
    author : {type : String, required: true}
},{collection: 'user-data'});

exports.insertData = mongoose.model('insertData', insertSchema);

