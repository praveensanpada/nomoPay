
require("dotenv").config()
const Sequelize = require("sequelize");

const sequelize = new Sequelize("nomoapp", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate().then(() => {
    console.log("Database Conneection Success.")
}).catch((err) => {
    console.log("Database Conneection Error.")
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
db.login = require("./login.js")(sequelize, Sequelize);

db.currency = require("./currency.js")(sequelize, Sequelize);
db.kyc = require("./kyc.js")(sequelize, Sequelize);

db.payment = require("./payment.js")(sequelize, Sequelize);
db.pin = require("./pin.js")(sequelize, Sequelize);

db.transaction = require("./transaction.js")(sequelize, Sequelize);
db.wallet = require("./wallet.js")(sequelize, Sequelize);

db.RazCustomer = require("./razCustomer.js")(sequelize, Sequelize);
db.RazOrder = require("./razOrder.js")(sequelize, Sequelize);

module.exports = db;