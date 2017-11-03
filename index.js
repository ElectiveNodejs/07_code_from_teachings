const express = require('express');
const app = express();

var Cors = require('cors');
/*app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});*/

app.use(Cors());
const customersModule = require('./routes/customers.js');
app.use(customersModule);

const productsModule = require('./routes/products.js');
app.use(productsModule);


const ordersModule = require('./routes/orders.js');
app.use(ordersModule);

app.use(express.static('public'));


app.listen(process.env.PORT || 3000);

