var products = require('../db/products')

const controller = {
    index: function(req, res){
        return res.render('index', {
            products: products.products,
            comments: products.comentarios,
    });
    },
    login: function(req, res){
        return res.render('login');
    },
    register: function(req, res){
        return res.render('register');
    },
    searchResults: function(req, res){
        return res.render('search-results', {
            products: products.products,
            comments: products.comentarios
        });
    },
    productAdd: function(req, res){
        return res.render('product-add')
    },
    profileEdit: function(req, res){
        return res.render('profile-edit')
    
    },
   
};

module.exports = controller;