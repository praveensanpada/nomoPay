
module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        user_id: {
            type: Sequelize.INTEGER
        },
        currency_id: {
            type: Sequelize.INTEGER
        },
        order_id: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
    return Payment;
};
