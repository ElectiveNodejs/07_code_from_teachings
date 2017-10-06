const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongodburl = 'mongodb://clbo:1234@cluster0-shard-00-00-9zvke.mongodb.net:27017,cluster0-shard-00-01-9zvke.mongodb.net:27017,cluster0-shard-00-02-9zvke.mongodb.net:27017/zalandodummy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// READ (all)
app.get('/customers', function(req, res){
 
    MongoClient.connect(mongodburl, function(err, db){
        
            var col = db.collection('customers');
            // Read All
            col.find().toArray(function (err, result) {
                //console.log(result);
                res.json(result);
            });
            db.close();
        });
});

app.listen(3000);

