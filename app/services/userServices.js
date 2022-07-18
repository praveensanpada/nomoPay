
const db = require("../models/index");
const { Op } = require("sequelize");

module.exports = {

    findUserByUserId: async (user_id) => {
        const result = await db.users.findAll({ where: { id: user_id } }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },


    findUserByEmailId: async (email) => {
        const result = await db.users.findAll({ where: { email: email } }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    findUserByPhoneNumber: async (countryCode, phoneNumber) => {
        const result = await db.users.findAll({
            where: {
                [Op.and]: {
                    countryCode: countryCode,
                    phoneNumber: phoneNumber
                }
            }
        }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    addNewUser: async (user) => {
        const result = await db.users.create(user).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    }
}