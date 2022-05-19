var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;

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
    storeRegister: function(req, res){
        db.User.create(req.body)
        .then(function(){
            res.redirect('/login');
        })
        .catch(function(error){
            res.send(error);
        })
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