const express = require('express');
const router = express.Router();
const db = require('../database/config');
const Category = require('../database/models/category.model');
const productModel = require('../database/models/product.model')
const { verificarUsuario, verificarAdmin } = require('../utils/middlewares')

router.use(verificarUsuario)

router.get('/', async (req, res) => {
    //const products = await db.query('select * from products where deleted=false', { type: db.QueryTypes.SELECT })
    console.log( 'Ingreso a productos' );

    const products = await productModel.findAll(
        {where: {deleted:false} , raw: true, nest: true, include: [{model: Category}] },
        );
    
    res.send(products);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!isNaN(id)) {
        //const products = await db.query('select * from products where id = ?', { replacements: [id], type: db.QueryTypes.SELECT });
        const products = await productModel.findOne( 
            { 
                where: { id: id, deleted: false} 
            } 
        );
        res.send(products);
    } else {
        res.send('Error')
    }
});

router.post('/', verificarAdmin, async (req, res) => {
    const { name, category_id, price, quantity } = req.body; // {name: 'tv', }
    deleted = false;

    const product = await productModel.create({
        name: name,
        categoryId: category_id,
        price: price,
        quantity: quantity,
        deleted: deleted
    })

    /*const result = await db.query(
        'INSERT INTO products (name, category_id, price, quantity, deleted) VALUES (?, ?, ? ,?, ?)',
        { replacements: [name, category_id, price, quantity, deleted] }
    )*/

    console.log(product)

    res.send(product.toJSON());
})

router.put('/:id', verificarAdmin, async (req, res) => {
    const { name, category_id, price, quantity } = req.body;
    const id = req.params.id;


    const product = await productModel.findOne( { where: {id} } )

    product.name = name;
    product.categoryId = category_id;
    product.price = price;
    product.quantity = quantity;

    product.save();

    res.send(product)
   /* if (!name || !category_id || !price || !quantity) {
        res.send('Error, faltan parametros');
    } else {
        const result = await db.query('UPDATE products SET name=?, category_id=?, price=?, quantity=? WHERE id = ?',
            { replacements: [name, category_id, price, quantity, id] });
        res.send(result)
    }*/

})

router.delete('/:id', verificarAdmin, async (req, res) => {
    //'DELETE FROM products WHERE id = :id'
    const id = req.params.id;
    //const result = await db.query('UPDATE products SET deleted=true WHERE id = ?',
    //    { replacements: [id] });

    //await productModel.destroy({ where: {id} })
    const product = await productModel.findOne( { where: {id} } )
    product.deleted = true;
    product.save();

    res.send('Borrado correctamente')
})


module.exports = router;