var products = require('../db/products');

const controller = {
    usuario: function(req, res){
        return res.render('profile', {usuario: products});
    }
};

module.exports = controller;