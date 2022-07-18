
module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        user_id: {
            type: Sequelize.INTEGER
        }
    });
    return Login;
};