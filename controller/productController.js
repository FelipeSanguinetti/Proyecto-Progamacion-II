var products = require('../db/products')

const controller = {

    product: function(req, res){
        return res.render('product', {
            title: 'Product',
            product: products.product[req.params.id - 1],
            comments: products.comentarios,
    

        })
    },


};

module.exports = controller;