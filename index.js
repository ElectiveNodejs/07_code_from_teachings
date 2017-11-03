const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongodburl = 'mongodb://clbo:1234@cluster0-shard-00-00-9zvke.mongodb.net:27017,cluster0-shard-00-01-9zvke.mongodb.net:27017,cluster0-shard-00-02-9zvke.mongodb.net:27017/zalandodummy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

        col.insertOne(req.body, function (err, result) {
            res.status(201);
            res.json({ msg: 'Customer Created' });
        })
        db.close();
    });
});
// DELETE
app.delete('/customers/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('customers');

        col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.status(204);
            res.json();

        });

        db.close();
    });
});


// UPDATE
app.put('/customers/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('customers');
    
            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result){
                res.status(204);
                res.json();
            });
            db.close();
        });
    });


// ===================
// Products ===========
// ====================
// READ (all)
app.get('/products', function (req, res) {
    MongoClient.connect(mongodburl, function (err, db) {

        var col = db.collection('products');
        // Read All
        col.find().toArray(function (err, result) {
            //console.log(result);
            res.json(result);
        });
        db.close();
    });
});
// READ (one)
app.get('/products/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('products');

        col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.json(result);
        })
        db.close();
    });
});
// CREATE
app.post('/products/', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('products');

        col.insertOne(req.body, function (err, result) {
            res.status(201);
            res.json({ msg: 'Customer Created' });
        })
        db.close();
    });
});
// DELETE
app.delete('/products/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('products');

        col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.status(204);
            res.json();

        });

        db.close();
    });
});


// UPDATE
app.put('/products/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('products');
    
            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result){
                res.status(204);
                res.json();
            });
            db.close();
        });
    });

// ===================
// Orders ===========
// ====================
// READ (all)
app.get('/orders', function (req, res) {
    MongoClient.connect(mongodburl, function (err, db) {

        var col = db.collection('orders');
        // Read All
        col.find().toArray(function (err, result) {
            //console.log(result);
            res.json(result);
        });
        db.close();
    });
});
// READ (one)
app.get('/orders/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('orders');

        col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.json(result);
        })
        db.close();
    });
});
// CREATE
app.post('/orders/', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
       
        var orderCol = db.collection('orders');
        var custCol = db.collection('customer');
        var prodCol = db.collection('products');

        var ordersTotal = {};

        custCol.findOne({ '_id': ObjectId(req.body.user) }, function(err, result){
                
                console.log(req.body.user);
                ordersTotal.user = result;
                console.log(ordersTotal);
                res.json(result);
        });

        var productsArray = [];

        req.body.products.forEach(function(element, index, array) {
            
            prodCol.findOne({ '_id': ObjectId(element) }, function(err, result){
                productsArray = result;
            });

            if(index === array.length-1) {
                ordersTotal = productsArray;
            }

        });

        

        

        /*col.insertOne(ordersTotal, function (err, result) {
            res.status(201);
            res.json({ msg: 'Customer Created' });
        })*/
        db.close();
    });
});
// DELETE
app.delete('/orders/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('orders');

        col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.status(204);
            res.json();

        });

        db.close();
    });
});


// UPDATE
app.put('/orders/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('orders');
    
            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result){
                res.status(204);
                res.json();
            });
            db.close();
        });
    });





app.listen(3000);

