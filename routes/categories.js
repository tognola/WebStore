const express = require('express');
const router = express.Router();
const db = require('../database/config')
const categoriesModel = require('../database/models/category.model')
const { verificarAdmin, verificarUsuario } = require('../utils/middlewares');

router.use(verificarUsuario)

router.get('/', async (req, res) => {
    //const categories = await db.query('select * from categories', { type: db.QueryTypes.SELECT })
    const categories = await categoriesModel.findAll({raw : true});
    res.send(categories);
})

router.post('/', verificarAdmin,async (req, res)=>{
    const {name} = req.body;
    deleted = false;

    const result = await db.query('INSERT INTO categories (name, deleted) VALUES (?, ?)',
        {replacements: [name, deleted]}
    )

    res.send(result)
})


module.exports = router;