const { Server } = require('../database/db')

class DatabaseHandler {
    constructor() {
        this.data = "";
    }

    async getServer(guildid) {
        let data = await Server.findOne({ where: { serverID: guildid }, raw: true })

        if (!data || data == null) {
            data = await Server.create({ serverID: guildid })
            this.data = data.dataValues;
            return this.data;

        } else {
            this.data = data;
            return this.data;
        }
    }

    async insertServer(guildid) {
        let data = await Server.create({ serverID: guildid })
        if (data) return true;
    }

    async updateValues(data) {
        if (data.footer) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ footer: data.footer })
        }
        if (data.premiumStatus) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ premiumStatus: data.premiumStatus })
        }
        if (data.color) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ color: data.color })
        }
        if (data.method) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ method: data.method })
        }
        if (data.unverifiedID) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ unverifiedID: data.unverifiedID })
        }
        if (data.verifiedID) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ verifiedID: data.verifiedID })
        }
        if (data.verfChannel) {
            let c = await Server.findOne({ where: { serverID: data.guildid } })

            c.update({ verfChannel: data.verfChannel })
        }
    }
}
module.exports = DatabaseHandler;
