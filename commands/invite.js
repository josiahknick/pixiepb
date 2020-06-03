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

    const serverPing = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('Pixie Bot - Invite')
        .setDescription('You can invite me to your server using this [link](https://discordapp.com/oauth2/authorize?client_id=704387663448375406&permissions=8&scope=bot).\n\n If you are having issues inviting the bot because you are on your phone right now, use the command `.invite mobile`')
        .setTimestamp()
        .setFooter(guild.footer);


    if (!arguments[1]) {
        message.channel.send(serverPing);
    } else if (arguments[1] === "mobile") {
        message.channel.send("Here is the link for mobile users: <https://discordapp.com/oauth2/authorize?client_id=704387663448375406&permissions=8&scope=bot>")
    } else {
        message.channel.send("Invalid Argument: You may only send the following arguments - `mobile`.")
    }

}