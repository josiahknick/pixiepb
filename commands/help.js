const DatabaseHandler = require(`../funct/DatabaseHandler.js`);
const discord = require('discord.js');

exports.run = async (client, message, args) => {

    const Database = new DatabaseHandler()
    let guild = await Database.getServer(message.guild.id)

    const serverPing = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('Pixie Bot - Help Command')
        .setDescription('`.help` - Current command \n`.ping` - Check the bots responce time.\n`.initate` - Run this command to setup the bot in your server for the first time.\n`.config` - Configure Pixie for your server.\n`.premium` - Get more information about Pixie Premium or get purchase link.')
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/app-icons/704387663448375406/867ff9162a76067e6756b15152e2e641.png?size=256")
        .setFooter(guild.footer);

    message.channel.send(serverPing);

}