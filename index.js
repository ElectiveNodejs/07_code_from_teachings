const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongodburl = 'mongodb://clbo:1234@cluster0-shard-00-00-9zvke.mongodb.net:27017,cluster0-shard-00-01-9zvke.mongodb.net:27017,cluster0-shard-00-02-9zvke.mongodb.net:27017/zalandodummy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended : true}));

// READ (all)
app.get('/customers', function (req, res) {
    MongoClient.connect(mongodburl, function (err, db) {

        var col = db.collection('customers');
        // Read All
        col.find().toArray(function (err, result) {
            //console.log(result);
            res.json(result);
        });
        db.close();
    });
});
// READ (one)
app.get('/customers/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('customers');

        col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.json(result);
        })
        db.close();
    });
});
// CREATE
app.post('/customers/', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('customers');
    
           col.insertOne(req.body, function(err , result){
                res.status(201);
                res.json({msg : 'Customer Created'});
           })
            db.close();
        });
    });
// DELETE

// UPDATE

app.listen(3000);

