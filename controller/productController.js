var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs')

const controller = {

    product: function(req, res){
        /* comments: products.comentarios */

        db.Product.findByPk(req.params.id , { include: { all: true, nested: true } }, {order: [ [db.Comment.createdAt, 'DESC']]},)
        .then(function(data){
            res.render('product', {product: data});
        })
        .catch(function(error){
            res.send(error);
        })
    },
    delete: function(req, res) {
        
        if (!req.session.user ) {
            throw Error('Not authorized.')
        }
        db.Product.destroy({ where: { id: req.params.id } })
            .then(function() {
                res.redirect('/profile/me')
            })
            .catch(function(error) {
                res.send(error);
            })
    },
    edit: function(req, res) {
        if (!req.session.user ) {
            throw Error('Not authorized.')
        }
        db.Product.findByPk(req.params.id)
            .then(function (product) {
                res.render('product-edit', { product });
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    storeComment: function(req, res){
        if(!req.session.user){
            throw Error('Tenés que estar logueado para comentar una publicación')
        
        
        }
        req.body.usuario_id = req.session.user.id;
        req.body.producto_id = req.params.id;
        req.body.created_at = new Date();
        db.Comment.create(req.body)
            .then(function() {

                
                res.redirect(req.params.id)
            })
            .catch(function(error) {
                res.send(error);
            })
    }


};

module.exports = controller;

