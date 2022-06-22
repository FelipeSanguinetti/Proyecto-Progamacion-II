var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs');
const { memoryStorage } = require('multer');

const controller = {

    product: function(req, res){
        /* comments: products.comentarios */

        db.Product.findByPk(req.params.id , {
             include: { all: true, nested: true } , 
             order: [ ['comentarios', 'created_at', 'DESC']],
            })
        .then(function(data){
            res.render('product', {product: data});
        })
        .catch(function(error){
            res.send(error);
        })
    },
    delete: async function(req, res) {
        
        try {
        const producto=await db.Product.findByPk(req.params.id)
        if(producto.usuario_id != req.session.user.id){
            throw Error ('Este producto no te pertenece')}
        if (!req.session.user ) {
            throw Error('Not authorized.')}
        } catch (err) {
            return res.send( {error: err.message});
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
                if(product.usuario_id != req.session.user.id){res.redirect('/')}
                res.render('product-edit', { product });
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    update: async function(req, res){
        try {
            /* if(db.Product.findByPk(req.params.id).usuario_id != req.session.user.id){throw Error ('Este producto no te pertenece')} */
            const producto = await db.Product.findByPk(req.params.id)
            if(producto.usuario_id != req.session.user.id){throw Error('Este producto no te pertenece')}
            if (!req.session.user) {throw Error ('Tenés que iniciar sesión.')}
            if (!req.body.nombre) {throw Error ('Debes proveer el nombre del producto.')}       
            if (!req.body.descripcion) { throw Error('Debes proveer una descripcion del producto') }
            if (!req.body.fecha) { throw Error('Debes seleccionar la fecha de carga.') }
        } catch (err) {
            return db.Product.findByPk(req.params.id)
            .then(function (product) {
                res.render('product-edit', {error: err.message, product });
            })
            .catch(function (error) {
                res.send(error);
            })
        }
        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.Product.update(req.body, {where: {id: req.params.id}})
        .then(function(){
            res.redirect('/profile/me')
        })
        .catch(function(error){
            res.send(error)
        })
        .catch(function(error){
            res.send(error)
        })
    },
    storeComment: function(req, res){
        try{
            if(!req.session.user){throw Error('Tenés que estar logueado para comentar una publicación.')}
        }catch (err) {
            res.redirect('/login')
        }
        if(req.session.user){
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
    }

};

module.exports = controller;

