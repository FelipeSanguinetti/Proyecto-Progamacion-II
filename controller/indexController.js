var products = require('../db/products')

const controller = {
    index: function(req, res){
        return res.render('index', {
            title: 'Index',
            products: products.products,
            comments: products.comentarios,
    });
    },
    login: function(req, res){
        return res.render('login', {title: 'Login'});
    },
    register: function(req, res){
        return res.render('register', {title: 'Register'});
    },
    searchResults: function(req, res){
        return res.render('search-results', {title: 'Search Results'});
    },
    productAdd: function(req, res){
        return res.render('product-add', {title: 'Add Product'})
    },
    profileEdit: function(req, res){
        return res.render('profile-edit', {title: 'Edit Profile'})
    
    },
   
};

module.exports = controller;