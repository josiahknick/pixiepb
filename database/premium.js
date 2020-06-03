const Sequelize = require('sequelize');
const db = require('./connection');

const Premium = db.define('prem', {
    key: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    length: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    redeemDate: {
        type: Sequelize.STRING(255),
        defaultValue: false
    },
    expireDate: {
        type: Sequelize.STRING(255),
        defaultValue: false
    },
    serverID: {
        type: Sequelize.STRING(255),
        defaultValue: false
    }
});

module.exports = Premium;