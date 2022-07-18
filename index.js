
const express = require("express");
const app = express()
var cors = require("cors")
var bodyParser = require("body-parser")

const PORT = process.env.PORT || 8083;
// const PORT = 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(cors());
app.use(express.json())
app.use(urlencodedParser)

const db = require("./app/models/index")
const authRoutes = require('./app/routes/authRoutes')
const payRoutes = require('./app/routes/payRoutes')

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to nm application." });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pay', payRoutes);

app.get('*', (req, res) => {
    res.send("404! Page Not Found....");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
