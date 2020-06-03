const DatabaseHandler = require(`../funct/DatabaseHandler.js`);
const discord = require('discord.js');
const fs = require('fs');
const t2p = require('text2png');

exports.run = async (client, message, args) => {

    const Database = new DatabaseHandler()
    let guild = await Database.getServer(message.guild.id)

    const embed = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('Pixie Bot - Verification')
        .setDescription()
        .setImage()
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/app-icons/704387663448375406/867ff9162a76067e6756b15152e2e641.png?size=256")
        .setFooter(guild.footer);

    const verfServer = `I have sent you a DM with your instructions to gain access to the rest of this discord server.`;
    const embedVerf = `This server requires to fill out a Captcha before gaining access to the server. Please reply with the following characters in my private messages to gain access to the server.`;

    message.channel.send(embed.setDescription(verfServer))

    //captcha code
    var text = Math.random().toString(36).substring(5, 17);
    var filename = message.guild.id + "." + text + ".png";
    var path = 'images/' + filename;

    fs.writeFileSync('images/' + filename, t2p(text, {
        font: '50px Annifont',
        localFontPath: 'fonts/font.ttf',
        localFontName: 'Annifont',
        color: 'teal',
        backgroundColor: 'linen'
    }));

    message.author.send(embed.setDescription(embedVerf));

}