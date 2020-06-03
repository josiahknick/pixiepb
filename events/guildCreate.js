const discord = require('discord.js');
const DatabaseHandler = require('../funct/DatabaseHandler')

module.exports = (client, guild, message) => {
  const Database = new DatabaseHandler();

  Database.insertServer(guild.id)
};