
module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define("currency", {
        currency_name: {
            type: Sequelize.STRING
        },
        country_symbol: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Currency;
};
