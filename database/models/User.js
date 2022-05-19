const sequelize= require('sequelize')


module.exports= function(sequelize,DataTypes){


    const cols={
        id:{
            autoincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        usuario:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        nombre:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        apellido:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        mail:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        contrasena:{
            type:DataTypes.STRING, 
            allowNull: false
        },
        imagen:{
            type:DataTypes.STRING
        }
    }

    const configs={
        
        tableName:'usuarios',
        timestampes:false
    }

    const User= sequelize.define('User',cols, configs)
    return User;
}