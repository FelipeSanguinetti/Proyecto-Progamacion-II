const sequelize= require('sequelize')


module.exports= function(sequelize,DataTypes){

    const cols={
        id:{
            autoIncrement:true,
            primaryKey:true,
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        tipo:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        imagen: {
            type:DataTypes.STRING, 
            allowNull: false
        },
        nombre:{
            type:DataTypes.STRING, 
            allowNull: false
        }, 
        descripcion: {
            type:DataTypes.STRING 
        }, 
        fecha: {
            type:DataTypes.DATE, 
            allowNull: false
        },
        usuario_id: {
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    }
 
    const configs={
        tableName:'productos',
        timeStamps: true
    }



    const Product= sequelize.define('Product',cols,configs);


    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "usuario_id"
        })
    };

    Product.associate = function(models){
        Product.hasMany(models.Comment, {
            as: "comentarios", 
            foreignKey: "producto.id"
        })
    };

    return Product;
}