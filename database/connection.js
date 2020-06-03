const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const con = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
        compress: true
    },
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 200000,
        acquire: 200000
    }
});

module.exports = con;