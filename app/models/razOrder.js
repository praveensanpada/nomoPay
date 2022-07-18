



module.exports = (sequelize, Sequelize) => {
    const RazOrder = sequelize.define("raz_order", {
        ord_id: {
            type: Sequelize.STRING
        },
        ord_entity: {
            type: Sequelize.STRING
        },
        ord_amount: {
            type: Sequelize.INTEGER
        },
        ord_amount_paid: {
            type: Sequelize.INTEGER
        },
        ord_currency: {
            type: Sequelize.STRING
        }
    });
    return RazOrder;
};
