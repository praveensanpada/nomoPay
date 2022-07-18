
module.exports = (sequelize, Sequelize) => {
    const Kyc = sequelize.define("kyc", {
        user_id: {
            type: Sequelize.INTEGER
        },
        isAdhar: {
            type: Sequelize.INTEGER
        },
        isPan: {
            type: Sequelize.INTEGER
        },
        isBank: {
            type: Sequelize.INTEGER
        }
    });
    return Kyc;
};
