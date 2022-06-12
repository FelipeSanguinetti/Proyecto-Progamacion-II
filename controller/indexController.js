var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs')



const controller = {
    index: function(req, res){
        db.Product.findAll({ include: { all: true, nested: false } })
        .then(function(data){
            res.render('index', {products: data});
        })
        .catch(function(error){
            res.send(error);
        })
    },
    login: function(req, res){
        return res.render('login');
    },

    access: function(req, res, next) {
        db.User.findOne({ where: { usuario: req.body.usuario }})
            .then(function(user) {
                if (!user) throw Error('User not found.')
                if (hasher.compareSync(req.body.contrasena, user.contrasena)) {
                    req.session.user = user;
                    if (req.body.recordarme){
                        res.cookie('userId', user.id, {maxAge: 1000 * 60 * 60 * 7})
                    }
                    res.redirect('/');
                } else {
                    throw Error('Invalid credentials.')
                }
            })
            .catch(function (err) {
                next(err)
            })
    },
    logout: function(req, res){
        req.session.user = null;
        res.clearCookie('userId');
        res.redirect('/');
    },
    register: function(req, res){
        return res.render('register');
    },

    storeRegister: function(req, res){
        req.body.contrasena=bcrypt.hashSync(req.body.contrasena, 10)
        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.User.create({
            usuario: req.body.usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            mail: req.body.mail,
            contrasena: req.body.contrasena,
            imagen: req.body.imagen,
            fechaNacimiento: req.body.fechaNacimiento
        })
        .then(function(){
            res.redirect('/login');
        })
        .catch(function(error){
            res.send(error);
        })
    },
    update:function(req,res){

        req.body.contrasena=bcrypt.hashSync(req.body.contrasena, 10)
        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.User.update(req.body,{where: {id: req.session.user.id}})
            .then(function(data){
                if (req.file) {
                    req.session.user.imagen = req.body.imagen;
                }
                res.redirect('/')
            })

            .catch(function(error){
                res.send(error)
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
    storeProduct: function(req, res){
        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.Product.create({
            nombre: req.body.nombre,
            imagen: req.body.imagen,
            descripcion: req.body.descripcion,
            tipo: req.body.tipo,
            fecha: req.body.fecha,
            usuario_id: req.session.user.id
        })
        .then(function(){
            res.redirect('/profile/'+req.session.user.id);
        })
        .catch(function(error){
            res.send(error);
        }) 
    },
    profileEdit: function(req, res){
        return res.render('profile-edit')
    }, 
   
};

module.exports = controller;