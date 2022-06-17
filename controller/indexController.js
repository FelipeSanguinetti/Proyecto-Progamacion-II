var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs')



const controller = {
    index: function(req, res){
        db.Product.findAll({
            include: { all: true, nested: true },
            order: [ ['fecha', 'DESC']],
        })
        .then(function(data){
            console.log(data);
            res.render('index', {products: data});
        })
        .catch(function(error){
            res.send(error);
        })
    },
    login: function(req, res){
        if (req.session.user != undefined) {
            return res.redirect ('/')
        } else {
        return res.render('login');
        }
    },
    
    access: function(req, res, next) {
        
        db.User.findOne({
            where: {
                [op.or]: [
                    {usuario:req.body.usuario},
                    {mail: req.body.usuario}]
                }})
                   
            .then(function(user) {
                if (!user) throw Error('No existe el usuario ingresado.')
                if (hasher.compareSync(req.body.contrasena, user.contrasena)) {
                    req.session.user = user;
                    if (req.body.recordarme){
                        res.cookie('userId', user.id, {maxAge: 1000 * 60 * 60 * 7})
                    }
                    res.redirect('/');
                } else {
                    throw Error('Contraseña incorrecta.')
                }
            })
            .catch(function (err) {
                return res.render('login', { error: err.message });
            })
    },
    logout: function(req, res){
        req.session.user = null;
        res.clearCookie('userId');
        res.redirect('/');
    },
    register: function(req, res){
        if (req.session.user != undefined) {
            return res.redirect ('/')
        } else {
        return res.render('register');
        }
    },

    storeRegister: async function(req, res){
        
        try {
        if (!req.body.nombre) {throw Error ('Debes proveer un nombre.')}    
        if (!req.body.apellido) {throw Error ('Debes proveer un apellido.')}    
        if (!req.body.usuario) { throw Error('Debes proveer un usuario.') }
        const usuario = await db.User.findOne({ where: { usuario: req.body.usuario} })
        if (usuario) { throw Error('Ya existe ese nombre de usuario.') }
        if (!req.body.fechaNacimiento) { throw Error('Debes seleccionar una fecha de nacimiento.') }
        if (!req.body.mail) { throw Error('Debes proveer un email.') }
        const user = await db.User.findOne({ where: { mail: req.body.mail } })
        if (user) { throw Error('Ya existe un usuario con ese email.') }
        if (req.body.contrasena.length < 3) { throw Error('Tu contraseña debe ser mayor a 3 caracteres.') }
        if (!req.file){req.body.imagen = '/images/user.png'}
        
    
    } catch (err) {
        return res.render('register', { error: err.message });
    }
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
    searchResults: function(req, res){
        db.Product.findAll({
            where: {
                [op.or]: [
                    {nombre: {[op.like]: '%' + req.query.search + '%'}},
                    {descripcion: {[op.like]: '%' + req.query.search + '%'}},
                    {tipo: {[op.like]: '%' + req.query.search + '%'}}
                ]
            },
            include: { all: true, nested: true }
        })
        .then(function(data){
            res.render('search-results', {products:data})
        })
        .catch(function(error){
            res.send(error)
        })
    },
    
    productAdd: function(req, res){
        if (req.session.user == undefined) {
            return (res.redirect ('/login'));
        } else {
            return res.render('product-add');
        }
    },
    
    storeProduct: function(req, res){
        try {
            if (!req.session.user) {throw Error ('Tenés que iniciar sesión.')}
            if (!req.body.nombre) {throw Error ('Debes proveer el nombre del producto.')}    
            if (!req.file) {throw Error ('Debes seleccionar una imagen.')}    
            if (!req.body.descripcion) { throw Error('Debes proveer una descripcion del producto') }
            if (!req.body.fechaCarga) { throw Error('Debes seleccionar la fecha de carga.') }
           
        } catch (err) {
            return res.render('product-add', { error: err.message });
        }
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
    }
};

module.exports = controller;