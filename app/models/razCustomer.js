


module.exports = (sequelize, Sequelize) => {
    const RazCustomer = sequelize.define("raz_customer", {
        cust_id: {
            type: Sequelize.STRING
        },
        cust_entity: {
            type: Sequelize.STRING
        },
        cust_name: {
            type: Sequelize.STRING
        },
        cust_email: {
            type: Sequelize.STRING
        },
        cust_contact: {
            type: Sequelize.STRING
        }
    });
    return RazCustomer;
};
