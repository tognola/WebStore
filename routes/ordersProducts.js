const express = require('express');
const router = express.Router();
const db = require('../database/config');
const { verificarUsuario } = require('../utils/middlewares');

router.use(verificarUsuario);

router.get('/:order_id', async(req,res)=> {
    // 

    if(req.params.order_id){
        const results = await db.query('SELECT o.id, o.date, o.state, o.total_price, p.name, p.price, op.quantity, u.username FROM orders_prod_users op JOIN orders o on op.order_id = o.id JOIN products p ON op.product_id=p.id JOIN users u ON op.user_id = u.id WHERE o.id = ?', { type: db.QueryTypes.SELECT,
            replacements: [req.params.order_id] });
    
        res.send(results)
    
    } else {
        res.send('Ingrese un id')
    }
})


router.post('/', async (req, res) => {
    const user_id = req.user.id;
    const { order_id, product_id, quantity } = req.body;

    const product = ( await db.query('SELECT * FROM products WHERE id = ? AND deleted=false', { type: db.QueryTypes.SELECT,
        replacements: [product_id] }) )[0];
    
    let { total_price } = ( await db.query('SELECT total_price FROM orders WHERE id = ?', {type: db.QueryTypes.SELECT,
        replacements: [order_id] }) )[0]; 
    
    console.log(total_price)
    if (product.quantity >= quantity) {
        total_price += product.price * quantity;

        const search =  await db.query('SELECT * FROM orders_prod_users WHERE order_id = ? AND product_id = ?', { type: db.QueryTypes.SELECT,
            replacements: [order_id, product_id] });

        if( search.length > 0){
            let old_quantity = search[0].quantity;
            let n_quantity = old_quantity + quantity;

            await db.query('UPDATE orders_prod_users SET quantity = ? WHERE order_id = ? and product_id = ?',
            { replacements: [n_quantity, order_id, product_id] });

        } else {
            await db.query('INSERT INTO orders_prod_users (order_id, product_id, user_id, quantity) VALUES (?, ? ,? ,?)',
            { replacements: [order_id, product_id, user_id, quantity] });
        }        

        await db.query('UPDATE orders SET total_price = ? WHERE id = ? ',
            { replacements: [total_price, order_id] });

        let new_quantity = product.quantity - quantity;
        await db.query('UPDATE products SET quantity = ? WHERE id = ? ',
            { replacements: [new_quantity, product_id] });

        res.send('Añadido al carrito correctamente')
    } else {
        res.send('No hay cantidad suficiente')
    }

})

module.exports = router;

// 'PENDING','CANCELED','CLOSED','REJECTED','PAID'

