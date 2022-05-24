var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs')



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

    access: function(req, res, next) {
        db.User.findOne({ where: { usuario: req.body.usuario }})
            .then(function(user) {
                if (!user) throw Error('User not found.')
                if (hasher.compareSync(req.body.contrasena, user.contrasena)) {
                    res.redirect('/');
                } else {
                    throw Error('Invalid credentials.')
                }
            })
            .catch(function (err) {
                next(err)
            })
        },


    register: function(req, res){
        return res.render('register');
    },
    storeRegister: function(req, res){
        
        req.body.contrasena=bcrypt.hashSync(req.body.contrasena, 10)
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