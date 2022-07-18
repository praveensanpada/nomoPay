
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        email: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isGoogleAccount: {
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        countryCode: {
            type: Sequelize.STRING
        },
        birthDate: {
            type: Sequelize.DATE
        },
        isPhoneVerified: {
            type: Sequelize.INTEGER
        },
        isEmailVerified: {
            type: Sequelize.INTEGER
        },
        isAppDark: {
            type: Sequelize.INTEGER
        },
        isAppLite: {
            type: Sequelize.INTEGER
        },
        isUserBlocked: {
            type: Sequelize.INTEGER
        },
        userBlockReason: {
            type: Sequelize.STRING
        },
        isKycDone: {
            type: Sequelize.INTEGER
        },
        bankProof: {
            type: Sequelize.INTEGER
        },
        governmentId: {
            type: Sequelize.INTEGER
        },
    });
    return Users;
};