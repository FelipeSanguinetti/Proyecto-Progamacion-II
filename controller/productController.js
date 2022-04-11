var products = require('../db/products')

const controller = {

    product: function(req, res){
        return res.render('product', {
            title: 'Product',
            products: products.products,
             id: req.params.id,
            products: products.products
       

        })
    },

  
            

  


};

module.exports = controller;