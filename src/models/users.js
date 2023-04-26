import {DataTypes} from 'sequelize'
import {sequelize} from "../config/database.js";


export const User = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    username:{
        type: DataTypes.STRING
        },
           
    name:{
        type: DataTypes.STRING
        },
    lastname:{
        type: DataTypes.STRING
        },        
    password:{
        type: DataTypes.STRING
        },        
    active:{
        type: DataTypes.BOOLEAN
        }, 
})
