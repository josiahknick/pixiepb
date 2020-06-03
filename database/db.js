const db = require('./connection');

const Server = require('./server');
const Premium = require('./premium');
const Verf = require('./verf');

db.sync().catch(error => console.log('Database error:', error));

module.exports = { Server, Premium, Verf }