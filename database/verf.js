const Sequelize = require('sequelize');
const db = require('./connection');

const Verf = db.define('verf', {
    serverID: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    lastAttempt: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    totalTries: {
        type: Sequelize.STRING(255),
        defaultValue: false
    }
});

module.exports = Verf;