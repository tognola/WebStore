const express = require('express');
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const ordersProductsRouter = require('./routes/ordersProducts')

const app = express();

app.use(express.json())

app.listen(8000, () => {
    console.log('Escuchando puerto 8000')
})

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', usersRouter);
app.use('/orders', ordersRouter);
app.use('/cart', ordersProductsRouter);

