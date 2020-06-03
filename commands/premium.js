const DatabaseHandler = require(`../funct/DatabaseHandler.js`);
const discord = require('discord.js');

exports.run = async (client, message, args) => {

    const Database = new DatabaseHandler()
    let guild = await Database.getServer(message.guild.id)

    const arg = message.content.slice(".");
    const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
    const arguments = [];
    arg.match(regex).forEach(element => {
        if (!element) return;
        return arguments.push(element.replace(/"/g, ''));
    });

    const premiumEmbed = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('Pixie Bot - Premium')
        .setDescription('You are able to purchase premium using this [link](https://shoppy.gg/@pixie.bot).\n\n Some of the features of Premium include:\n - Custom Embed Footer\n - Custom Embed Colors\n - Phone Server Verification\n - Text Server Verification\n - Email Server Verification\n\n Once purchased check your email for your redeem key, and then use the command `.config redeem <key>` in the server you wish to redeem the key on.')
        .setTimestamp()
        .setFooter(guild.footer);


    message.channel.send(premiumEmbed);

}