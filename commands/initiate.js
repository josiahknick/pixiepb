const DatabaseHandler = require(`../funct/DatabaseHandler.js`);
const PremiumHandler = require(`../funct/PremiumHandler.js`)
const discord = require('discord.js');

exports.run = async (client, message, g, args) => {

    const Database = new DatabaseHandler()
    const Premium = new PremiumHandler()

    let guild = await Database.getServer(message.guild.id)

    const embed = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('Pixie Bot - Initiate')
        .setDescription()
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/app-icons/704387663448375406/867ff9162a76067e6756b15152e2e641.png?size=256")
        .setFooter(guild.footer);

    const err = new discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Pixie Bot - Initiate')
        .setDescription("Well, this is awkward but there was a error when trying to read your responce. Please try the command again, and if the issue persists, join our support discord!")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/app-icons/704387663448375406/867ff9162a76067e6756b15152e2e641.png?size=256")
        .setFooter(guild.footer);

    const embedA = "Thank you for using Pixie. This command will help you setup Pixie inside of your server. When users join the server they will have message access to a single channel, which we will call our verification channel, do you already have a verification channel made or would you like me to make one for you?\n\nType `1` if you would like me to setup a verification channel\n\nType `2` if you already have a channel setup for verification."
    const err12 = "It seems you supplied me with something that isn't a 1 or 2. Please try this command again but make sure to respond with valid responces."
    const err21 = "You already ran the command `.initiate`. Please use the command `.config` to modify any settings previously set with this command."
    const noPerms = 'You do not have the correct permissions to use this command. You must have the permission `ADMINISTRATOR` to use this command.';


    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(err.setDescription(err21));
    }
    if (guild.method == "1" || guild.method == "2" || guild.method == "3" || guild.method == "4") {
        return message.channel.send(err.setDescription(err21));
    }

    let msg = await message.channel.send({ embed })

    var filter = m => !m.author.bot && m.member.id !== client.user.id && m.member.id == message.author.id && m.channel.id == message.channel.id;

    message.channel.bulkDelete(1).catch(err => { });
    msg.channel.send(embed.setDescription(embedA));

    let collected = await message.channel.awaitMessages(filter, { max: 1, time: 180000 })

    if (!collected) return message.edit({ err })
    collected = collected.first().content.toString();
    let type;
    type = parseInt(collected)

    if (type != 1 && type != 2) {
        message.channel.bulkDelete(2).catch(err => { });
        return message.channel.send(err.setDescription(err12));
    }
    message.channel.bulkDelete(2).catch(err => { });
    if (type == 1) {
        let channel = await g.channels.create('verification', { type: 'text', reason: 'Please verify yourself to access this server.' });
        const embedB1 = "Awesome, here is the channel I created: " + message.guild.channels.cache.get(channel.id).toString() + "\n\nWhen a user joined the server we are going to apply a role to them so that they can only send messages in our verifcation channel we created, do you want Pixie to make this role for you, or do you already have one made?\n\nType `1` to have Pixie make a new role.\nType `2` to use a role you already made."
        msg.channel.send(embed.setDescription(embedB1));

        const verfChannel = channel.id;

        let vCh = await Database.updateValues({ verfChannel, guildid: message.guild.id });

        let collected = await msg.channel.awaitMessages(filter, { max: 1, time: 180000 })
        if (!collected) return message.edit({ err })

        collected = collected.first().content.toString();
        let type;
        type = parseInt(collected)

        message.channel.bulkDelete(2).catch(err => { });

        if (type == 1) {
            let role = await g.roles.create({ data: { name: 'Unverified' } });
            const embedCB = "Alright, I have created this role:" + message.guild.roles.cache.get(role.id).toString() + ". \n\n Next Pixie needs to know what role to give the user once they are verified. \n\nSend the Role `ID` of the role you want users to get once verified.\nType `1` if you wish for no role to be added upon successful verification.";

            var unverifiedID = role.id;
            let uID = await Database.updateValues({ unverifiedID, guildid: message.guild.id });

            msg.channel.send(embed.setDescription(embedCB));

            let collected = await msg.channel.awaitMessages(filter, { max: 1, time: 180000 })
            if (!collected) return message.edit({ err })

            collected = collected.first().content.toString();
            let type;
            type = parseInt(collected)
            message.channel.bulkDelete(2).catch(err => { });

            if (type == 1) {
                const verifiedID = 1;
                const embedDB = "Pixie has been successfuly setup for your Guild with the following settings:\n\nVerification Channel:" + message.guild.channels.cache.get(guild.verfChannel).toString() + "\nUnverified Role: None " + "\nVerification Method: `Captcha`";
                msg.channel.send(embed.setDescription(embedDB));
                let vID = await Database.updateValues({ verifiedID, guildid: message.guild.id });
                let methoA = await Database.updateValues({ method: "1", guildid: message.guild.id })
            } else {
                //return if not real
                const verifiedID = collected;
                let vID = await Database.updateValues({ verifiedID, guildid: message.guild.id });
                const embedDA = "Pixie has been successfuly setup for your Guild with the following settings:\n\nVerification Channel:" + message.guild.channels.cache.get(guild.verfChannel).toString() + "\nUnverified Role:" + message.guild.roles.cache.get(guild.unverifiedID).toString() + "\nVerified Role:" + message.guild.roles.cache.get(guild.verifiedID).toString() + "\nVerification Method: `Captcha`";
                msg.channel.send(embed.setDescription(embedDA));
                let methoA = await Database.updateValues({ method: "1", guildid: message.guild.id })
            }
        } else if (type == 2) {
            message.channel.bulkDelete(2).catch(err => { });
            const embedCA = "Alright, I see you already have a role you would like to use! Please send the role `ID` of the role that you want to use as your unverified role now."
            msg.channel.send(embed.setDescription(embedCA));

            let collected = await msg.channel.awaitMessages(filter, { max: 1, time: 180000 })
            if (!collected) return message.edit({ err })

            collected = collected.first().content.toString();
            let type;
            type = parseInt(collected)
            message.channel.bulkDelete(2).catch(err => { });

            var unverifiedID = collected;
            let uID = await Database.updateValues({ unverifiedID, guildid: message.guild.id });

            const embedE5 = "You have set your unverified role to:" + message.guild.roles.cache.get(guild.unverifiedID).toString() + "\n\n Next Pixie needs to know what role to give the user once they are verified.\n\nSend the Role `ID` of the role you want users to get once verified.\nType `1` if you wish for no role to be added upon successful verification.";
            let sendMessageFirstCauseNayNay = await msg.channel.send(embed.setDescription(embedE5));

            const shelf = true;
            if (shelf == true) {
                let collected = await msg.channel.awaitMessages(filter, { max: 1, time: 180000 })
                if (!collected) return message.edit({ err })

                collected = collected.first().content.toString();
                let type;
                type = parseInt(collected)
                message.channel.bulkDelete(2).catch(err => { });

                if (type == 1) {
                    const verifiedID = 1;
                    const embedDB = "Pixie has been successfuly setup for your Guild with the following settings:\n\nVerification Channel:" + message.guild.channels.cache.get(guild.verfChannel).toString() + "\nUnverified Role:" + message.guild.roles.cache.get(guild.unverifiedID).toString() + "\nVerified Role: None" + "\nVerification Method: `Captcha`";
                    msg.channel.send(embed.setDescription(embedDB));
                    let vID = await Database.updateValues({ verifiedID, guildid: message.guild.id });
                    let methoA = await Database.updateValues({ method: "1", guildid: message.guild.id })
                } else {
                    //return if not real
                    const verifiedID = collected;
                    let vID = await Database.updateValues({ verifiedID, guildid: message.guild.id });
                    const embedDA = "Pixie has been successfuly setup for your Guild with the following settings:\n\nVerification Channel:" + message.guild.channels.cache.get(guild.verfChannel).toString() + "\nUnverified Role:" + message.guild.roles.cache.get(guild.unverifiedID).toString() + "\nVerified Role:" + message.guild.roles.cache.get(guild.verifiedID).toString() + "\nVerification Method: `Captcha`";
                    msg.channel.send(embed.setDescription(embedDA));
                    let methoA = await Database.updateValues({ method: "1", guildid: message.guild.id })
                }
            }

        }

    } else if (type == 2) {
        const embedDF = "Unfortionantly, this has not been added to Pixie yet but will shortly in a future update, please restart this command and type `1` for the first prompt.";
        return msg.channel.send(err.setDescription(embedDF));
    }
}