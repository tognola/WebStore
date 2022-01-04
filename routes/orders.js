const express = require('express');
const router = express.Router();
const db = require('../database/config');
const { verificarUsuario } = require('../utils/middlewares');

router.use(verificarUsuario);

router.get('/', async(req, res) => {
    const orders = await db.query('select * from orders', {type: db.QueryTypes.SELECT});
    res.send(orders)
})

router.post('/', async (req,res) => {
    const order = await db.query("INSERT INTO orders (date, total_price, state) VALUES (CURRENT_TIMESTAMP,0, 'PENDING')");
    res.send(order)
})

module.exports = router;

// 'PENDING','CANCELED','CLOSED','REJECTED','PAID'

