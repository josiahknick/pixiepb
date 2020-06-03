const { Premium } = require('../database/db')

class PremiumHandler {
    constructor() {
        this.data = "";
    }

    async insertKey(key, length) {
        let data = await Premium.create({ key, length })
        if (data) return true;
    }

    async verifyValues(key) {
        let c = await Premium.findOne({ where: { key: key.key } })

        if (!c || c == null) {
            return false;
        } else {
            return c.serverID;
        }
    }

    async getPremium(key) {
        let data = await Premium.findOne({ where: { key: key.key } })

        this.data = data;
        return this.data;
    }


    async updateValues(data) {
        if (data.redeemDate) {
            let c = await Premium.findOne({ where: { key: data.key } })

            c.update({ redeemDate: data.redeemDate })
        }
        if (data.expireDate) {
            let c = await Premium.findOne({ where: { key: data.key } })

            c.update({ expireDate: data.expireDate })
        }
        if (data.serverID) {
            let c = await Premium.findOne({ where: { key: data.key } })

            c.update({ serverID: data.serverID })
        }
    }

}
module.exports = PremiumHandler;
