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
                include: { all: true, nested: false }
            }). then(function(products){
                console.log(products);
                res.render('profile', {user: data, products});
            })
        })
        .catch(function(error){
            res.send(error);
        })
    },
    profile: function(req, res){
        if(req.session.user.id == req.params.id){res.redirect('/profile/me')}
        db.User.findByPk(req.params.id, {include: { all: true, nested: false }})
        .then(function(data){
            db.Product.findAll({
                where: [
                    {usuario_id: req.params.id}
                ],
                include: { all: true, nested: false }
            }). then(function(products){
                console.log(products);
                res.render('profile', {user: data, products});
            })
        })
        .catch(function(error){
            res.send(error);
        })
    },

    edit: function(req, res){
        if(req.session.user){
            res.render('profile-edit');
        } else{
            res.redirect('/')
        } 
    },
    update:function(req, res){

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
   
};

module.exports = controller;