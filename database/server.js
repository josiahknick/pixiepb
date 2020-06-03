const Sequelize = require('sequelize');
const db = require('./connection');

const Server = db.define('server', {
    serverID: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    premiumStatus: {
        type: Sequelize.STRING(255),
        defaultValue: "0"
    },
    method: {
        type: Sequelize.STRING(255),
        defaultValue: "0"
    },
    verfChannel: {
        type: Sequelize.STRING(255),
        defaultValue: "0"
    },
    unverifiedID: {
        type: Sequelize.STRING(255),
        defaultValue: "0"
    },
    verifiedID: {
        type: Sequelize.STRING(255),
        defaultValue: "0"
    },
    footer: {
        type: Sequelize.STRING(255),
        defaultValue: "Pixie Bot - pixiebot.tech"
    },
    color: {
        type: Sequelize.STRING(255),
        defaultValue: "#ffb6c1"
    }
});

module.exports = Server;