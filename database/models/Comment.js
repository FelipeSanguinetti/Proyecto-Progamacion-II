const sequelize= require('sequelize')


module.exports= function(sequelize,DataTypes){


    const cols={
        id:{
            autoIncremenyt:true,
            primaryKey:true,
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        contenido: {
            type:DataTypes.STRING, 
            allowNull: false
        },
        usuario_id: {
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        producto_id: {
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }

    const configs={
        
        tableName:'comentarios',
        timestamps:false
    }


    const Comment= sequelize.define('Comment',cols,configs)

    Comment.associate = function(models){
        Comment.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "usuario_id"
        });
    };

    Comment.associate = function(models){
        Comment.belongsTo(models.Product, {
            as: "producto",
            foreignKey: "producto_id"
        })
    }

    return Comment;

}