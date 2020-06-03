const DatabaseHandler = require(`../funct/DatabaseHandler.js`);
const PremiumHandler = require(`../funct/PremiumHandler.js`)
const discord = require('discord.js');

exports.run = async (client, message, args) => {

    const Database = new DatabaseHandler()
    const Premium = new PremiumHandler()

    let guild = await Database.getServer(message.guild.id)

    const arg = message.content.slice(".");
    const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
    const arguments = [];
    arg.match(regex).forEach(element => {
        if (!element) return;
        return arguments.push(element.replace(/"/g, ''));
    });

    const key = arguments[2];

    const d = new Date();
    let date = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();

    const embed = new discord.MessageEmbed()
        .setColor(guild.color)
        .setTitle('Pixie Bot - Config')
        .setDescription()
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/app-icons/704387663448375406/867ff9162a76067e6756b15152e2e641.png?size=256")
        .setFooter(guild.footer);

    const noArgs = 'No arguements were provided!\n\n **You are able to configure the following with Pixie Free:**\n `.config method` - Change your verification method to one of the following (Captcha).\n`.config redeem` - Redeem a purchased key to enable premium on your server.\n\n **You are able to configure the following with Pixie Premium:**\n`.config color` - Set the Embed Color.\n`.config footer` - Set the Footer to your own Custom Text.\n `.config method` - Change your verification method to one of the following (Captcha, Phone Verification, Email Verifiction, Text Verification).';
    const noPerms = 'You do not have the correct permissions to use this command. You must have the permission `ADMINISTRATOR` to use this command.';
    const noPrem = 'The command or argument you provide is a premium setting and can be accessed by paying for premium. You can learn more about premium with the command: `.premium`.';
    const noArgsMethod = "No arugement provided. Correct format is: `.config method <type>`. Valid types include: captcha, phone, email, or text.";
    const noArgsColor = "No arugement provided. Correct format is: `.config color #<hex>`.";
    const noArgsFooter = "No arugement provided. Correct format is: `.config footer <string>`.";
    const noArgsRedeem = "No arugement provided. Correct format is: `.config redeem <key>`";
    const footerSet = "Footer has been set to `" + arguments[2] + "`";
    const colorSet = "Color has been set to `" + arguments[2] + "`";
    const invalidKey = "The key you have provided `" + arguments[2] + "` is not a valid premium key, or is activated on another guild.";
    const redeemSuc = "You have successfully redeemed Premium on this Guild with the key:`" + arguments[2] + "`.";
    const noInit = "You must initiate your server before you can change the method for your server. Try the command `.initiate` to set the method.";
    const setVoice = "You have set the method to Voice. Users will now have to respond to a phone call, and DM Pixie a verification code communicated via the Phone Call.";
    const setCaptcha = "You have set the method to Captcha. Users will have to do a captcha correctly DMed by Pixie.";
    const setEmail = "You have set the method to Email. Users will now have to recieve a verification code via email and then DM the code to Pixie.";
    const setText = "You have set the method to Text. Users will now have to recieve a code via Text and DM it to Pixie.";
    const invalidMethodArgs = "You have entered a invalid option. You can set method to: `captcha`, `voice`, `text`, or `email`.";


    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPerms);

    if (!arguments[1]) {
        message.channel.send(embed.setDescription(noArgs))
    } else if (arguments[1] === "redeem") {
        if (!arguments[2]) {
            message.channel.send(embed.setDescription(noArgsRedeem))
        } else {
            let verf = await Premium.verifyValues({ key });

            if (verf === "0") {
                const serverID = message.guild.id;
                const key = arguments[2];
                var premiumStatus = "1";
                let redeemDate = month + "-" + date + "-" + year;
                let prem = await Database.updateValues({ premiumStatus, guildid: message.guild.id })
                let col = await Premium.updateValues({ key, serverID })
                let reDa = await Premium.updateValues({ key, redeemDate })

                message.channel.send(embed.setDescription(redeemSuc))
            } else if (verf === false) {
                return message.channel.send(embed.setDescription(invalidKey));
            } else if (verf !== "0") {
                return message.channel.send(embed.setDescription(invalidKey));
            }
        }
    } else if (arguments[1] === "method") {
        if (!arguments[2]) {
            message.channel.send(embed.setDescription(noArgsMethod))
        } else if (guild.method == 0) {
            message.channel.send(embed.setDescription(noInit));
        } else if (guild.method !== 0) {
            if (!arguments[2] == "text" || !arguments[2] == "email" || !arguments[2] == "voice" || !arguments[2] == "captcha") {
                message.channel.send(embed.setDescription(invalidMethodArgs))
            } else if (arguments[2] === "captcha") {
                let methoA = await Database.updateValues({ method: "1", guildid: message.guild.id })
                message.channel.send(embed.setDescription(setCaptcha))
            } else {
                if (guild.premiumStatus == "0") {
                    message.channel.send(embed.setDescription(noPrem))
                } else if (guild.premiumStatus == "1") {
                    if (arguments[2] === "voice") {
                        let methoB = await Database.updateValues({ method: "2", guildid: message.guild.id })
                        message.channel.send(embed.setDescription(setVoice))
                    } else if (arguments[2] === "email") {
                        let methoC = await Database.updateValues({ method: "3", guildid: message.guild.id })
                        message.channel.send(embed.setDescription(setEmail))
                    } else if (arguments[2] === "text") {
                        let methoD = await Database.updateValues({ method: "4", guildid: message.guild.id })
                        message.channel.send(embed.setDescription(setText))
                    }
                }
            }
        }
    } else if (arguments[1] === "color") {
        if (guild.premiumStatus == "0") {
            message.channel.send(embed.setDescription(noPrem))
        } else if (guild.premiumStatus == "1") {
            if (!arguments[2]) {
                message.channel.send(embed.setDescription(noArgsColor))
            } else {
                var color = arguments[2];
                let col = await Database.updateValues({ color, guildid: message.guild.id })
                message.channel.send(embed.setDescription(colorSet))
            }
        }
    } else if (arguments[1] === "footer") {
        if (guild.premiumStatus == "0") {
            message.channel.send(embed.setDescription(noPrem))
        } else if (guild.premiumStatus == "1") {
            if (!arguments[2]) {
                message.channel.send(embed.setDescription(noArgsFooter))
            } else {
                var footer = arguments[2];
                let foot = await Database.updateValues({ footer, guildid: message.guild.id })
                message.channel.send(embed.setDescription(footerSet))
            }
        }
    }

}