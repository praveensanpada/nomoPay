
module.exports = (sequelize, Sequelize) => {
    const Pin = sequelize.define("pin", {
        user_id: {
            type: Sequelize.INTEGER
        },
        myPin: {
            type: Sequelize.INTEGER
        }
    });
    return Pin;
};