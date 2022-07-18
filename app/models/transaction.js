



module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        user_id: {
            type: Sequelize.INTEGER
        },
        currency_id: {
            type: Sequelize.INTEGER
        },
        upi_id: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        wallet_id: {
            type: Sequelize.INTEGER
        },
        txn_id: {
            type: Sequelize.INTEGER
        },
        dest_id: {
            type: Sequelize.INTEGER
        },
        payment_id: {
            type: Sequelize.INTEGER
        }
    });
    return Transaction;
};