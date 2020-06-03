const PremiumHandler = require(`../funct/PremiumHandler.js`);
const discord = require('discord.js');

exports.run = async (client, message, args) => {

    if (message.author.id !== "691442466577973270") {
        return message.channel.send(`Invalid Permissions : Missing Permission - Josiah`);
    }

    const Premium = new PremiumHandler()

    const arg = message.content.slice(".");
    const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
    const arguments = [];
    arg.match(regex).forEach(element => {
        if (!element) return;
        return arguments.push(element.replace(/"/g, ''));
    });

    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const length = arguments[1];
    let insertKey = await Premium.insertKey(key, length);

    message.channel.send('Key inserted into database with the value: ' + "`" + key + "`. The key is good for: " + "`" + arguments[1] + "` months.")

};