const express = require('express');
const app = express();

const customersModule = require('./routes/customers.js');
app.use(customersModule);

const productsModule = require('./routes/products.js');
app.use(productsModule);


const ordersModule = require('./routes/orders.js');
app.use(ordersModule);

app.use(express.static('public'));


app.listen(3000);

