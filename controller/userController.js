var products = require('../db/products');
const db = require('../database/models');
const op = db.Sequelize.Op;
const hasher=require('bcryptjs')
const bcrypt=require('bcryptjs')


const controller = {
    profile: function(req, res){
        db.Product.findAll({
            where: [
                {usuario_id: req.params.id}
            ]
        });
        db.User.findByPk(req.params.id)
        .then(function(data){
            res.render('profile', {products:data});
        })
        .catch(function(error){
            res.send(error);
        })
    },
};

module.exports = controller;