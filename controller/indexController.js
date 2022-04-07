var products = require('../db/products')

const controller = {
    index: function(req, res){
        return res.render('index', {title: 'Index'});
    },
    login: function(req, res){
        return res.render('login', {title: 'Login'});
    },
    register: function(req, res){
        return res.render('register', {title: 'Register'});
    },
    searchResults: function(req, res){
        return res.render('search-results', {title: 'Search-Results'});
    },
    product: function(req, res){
        return res.render('product', {title: 'Product'})
    },
    profile: function(req, res){
        return res.render('profile', {
            title: 'Profile',
            usuario: products.usuarios
        })
    },
};

module.exports = controller;