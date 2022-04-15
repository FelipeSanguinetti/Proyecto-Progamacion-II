var products = require('../db/products')

const controller = {

    product: function(req, res){
        return res.render('product', {
            product: products.products[req.params.id - 1],
            comments: products.comentarios,
        })
    },


};

module.exports = controller;