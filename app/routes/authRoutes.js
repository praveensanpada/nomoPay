
const express = require('express');
const router = express.Router();

const authControllers = require("../controllers/authControllers")

router.post("/get-email-otp", authControllers.createEmailOtp);
router.post("/verify-email-otp", authControllers.verifyEmailOtp);

router.post("/get-phone-otp", authControllers.createPhoneOtp);
router.post("/verify-phone-otp", authControllers.verifyPhoneOtp);

router.post("/login", authControllers.login);
router.post("/verify-user", authControllers.verifyUser);

module.exports = router;
