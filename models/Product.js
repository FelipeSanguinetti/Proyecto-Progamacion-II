const sequelize= require('sequelize')


module.exports= function(sequelize,DataTypes){


    const cols={

        id:{

            autoincremen:true,
            primaryKey:true,
            type:DataTypes.INTEGER
        }
    }

    const configs={
        
        tableName:'Product',
        timestampes:false
    }


    const Product= sequelize.define('Product',cols,confignos)

    return Product;

}