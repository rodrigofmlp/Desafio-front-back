const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres', 
    dialectOptions:{
        ssl:{
            require: false,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;