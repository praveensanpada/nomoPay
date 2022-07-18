
module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
        user_id: {
            type: Sequelize.INTEGER
        },
        country_id: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
    return Wallet;
};
