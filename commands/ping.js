const DatabaseHandler = require(`../funct/DatabaseHandler.js`);
const discord = require('discord.js');

exports.run = async (client, message, args) => {

    const Database = new DatabaseHandler()
    let guild = await Database.getServer(message.guild.id)


    const serverPing = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('I have been summoned!')
        .setDescription(`I got back to you in ${message.createdTimestamp - Date.now()}ms.`)
        .setTimestamp()
        .setFooter(guild.footer);

    message.channel.send(serverPing);
}