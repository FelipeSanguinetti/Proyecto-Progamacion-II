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
        }
    }

    const configs={
        
        tableName:'comentarios',
        timestamps:false
    }


    const Comment= sequelize.define('Comment',cols,configs)

    return Comment;

}