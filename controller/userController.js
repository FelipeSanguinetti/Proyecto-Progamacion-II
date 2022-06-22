var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs')


const controller = {
    myProfile: function(req, res){
        console.log('myprofile');
        db.User.findByPk(req.session.user.id, {include: { all: true, nested: false }})
        .then(function(data){
            db.Product.findAll({
                where: [
                    {usuario_id: req.session.user.id}
                ],
                include: { all: true, nested: false },
                order: [ ['fecha', 'DESC']]
            }). then(function(products){
                console.log(products);
                res.render('profile', {userP: data, products});
            })
        })
        .catch(function(error){
            res.send(error);
        })
    },
    profile: function(req, res){
        if(req.session.user){
        if(req.session.user.id == req.params.id){res.redirect('/profile/me')}}
        db.User.findByPk(req.params.id, {include: { all: true, nested: false }})
        .then(function(data){
            db.Product.findAll({
                where: [
                    {usuario_id: req.params.id}
                ],
                include: { all: true, nested: false },
                order: [ ['fecha', 'DESC']]
            }). then(function(products){
                console.log(products);
                res.render('profile', {userP: data, products});
            })
        })
        .catch(function(error){
            res.send(error);
        })
    },

    edit: function(req, res){
        if('/profile/me'){
            res.render('profile-edit');
        } else{
            res.redirect('/')
        } 
    },
    update: async function(req, res){
        try {
            if (!req.body.nombre) {throw Error ('Debes proveer un nombre.')}    
            if (!req.body.apellido) {throw Error ('Debes proveer un apellido.')}    
            if (!req.body.usuario) { throw Error('Debes proveer un usuario.') }
            const usuario = await db.User.findOne({ where: { usuario: req.body.usuario} })
            if (usuario && usuario.id != req.session.user.id) {
                 throw Error('Ya existe ese nombre de usuario') 
            }
            if (!req.body.mail) { throw Error('Debes proveer un email.') }
            const user = await db.User.findOne({ where: { mail: req.body.mail } })
            if (user && user.id != req.session.user.id) { throw Error('Ya existe un usuario con ese email o es el que tenés actualmente.') }
            if (req.body.contrasena.length < 3) { throw Error('Tu contraseña debe ser mayor a 3 caracteres.') }
            
        } catch (err) {
            return res.render('profile-edit', { error: err.message });
        }
        req.body.contrasena=bcrypt.hashSync(req.body.contrasena, 10)
        if (req.file) req.body.imagen = (req.file.path).replace('public', '');
        db.User.update(req.body,{where: {id: req.session.user.id}})
            .then(function(data){
                if (req.file) {
                    req.session.user.imagen = req.body.imagen;
                }
                if (req.body.usuario) {
                    req.session.user.usuario = req.body.usuario;
                }
                res.redirect('/')
            })

            .catch(function(error){
                res.send(error)
            })

    },
   
};

module.exports = controller;