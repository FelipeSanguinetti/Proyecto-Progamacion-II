var products = require('../db/products');

const controller = {
    profile: function(req, res){
        return res.render('profile', {
            title: 'Profile',
            usuario: products.usuarios,
            products: products.products,
            comments: products.comentarios,
        });
    },
};

module.exports = controller;