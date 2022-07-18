
const express = require('express');
const router = express.Router();

const payControllers = require("../controllers/payControllers")

router.post("/add-to-kyc", payControllers.addToKyc);

router.post("/add-to-currency", payControllers.addToCurrency);

router.post("/add-to-pin", payControllers.addToPin);
router.post("/reset-to-pin", payControllers.resetPin);

router.post("/add-to-wallet", payControllers.addToWallet);

router.post("/checkout", payControllers.checkout);
router.post("/payment", payControllers.payment);

module.exports = router;
