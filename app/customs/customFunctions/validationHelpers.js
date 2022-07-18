
const emailvalidator = require("email-validator");
const crypto = require('crypto');

module.exports = {

    validateBodyData: (req_body_data) => {
        var check_body_data = false
        for (var i = 0; i < req_body_data.length; i++) {
            if (req_body_data[i] == undefined || req_body_data[i] == null || req_body_data == '') {
                console.log(req_body_data[i])
                check_body_data = true
                break;
            }
        }
        return check_body_data;
    },

    validateMobile: (mobile) => {
        var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return re.test(mobile);
    },

    validateEmail: (email) => {
        return emailvalidator.validate(email);
    },

    validateName: (name) => {
        var regName = /^[A-Za-z\s]+$/;
        if (name.length <= 3 || name >= 20) {
            return false
        } else if (!regName.test(name)) {
            return false
        } else {
            return true
        }
    },

    validatePassword: (password) => {
        if (password.length <= 3 || password >= 20) {
            return false;
        } else {
            return true;
        }
    },

    emailCreateOtp: (email) => {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const set_time = 60 * 60 * 1000;
        const expires = new Date().getTime() + set_time;
        const otpData = `${email}.${otp}.${expires}`;
        const hash = crypto.createHmac("sha256", "emailotpkey").update(otpData).digest("hex");
        const otpKey = `${hash}.${expires}`;
        return { email: email, emailOtp: otp, emailOtpKey: otpKey };
    },

    verifyEmailOtp: (email, emailOtp, emailOtpKey) => {
        let [hashValue, expires] = emailOtpKey.split(".");
        let now = new Date().getTime();
        if (now > parseInt(expires)) {
            return false;
        }
        let checkEmailOtp = `${email}.${emailOtp}.${expires}`;
        let newCalculatedHash = crypto.createHmac("sha256", "emailotpkey").update(checkEmailOtp).digest("hex");
        if (newCalculatedHash === hashValue) {
            return true;
        } else {
            return false;
        }
    },

    mobileCreateOtp: (mobile) => {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const set_time = 60 * 60 * 1000;
        const expires = new Date().getTime() + set_time;
        const otpData = `${mobile}.${otp}.${expires}`;
        const hash = crypto.createHmac("sha256", "mobileotpkey").update(otpData).digest("hex");
        const otpKey = `${hash}.${expires}`;
        return { mobile: mobile, mobileOtp: otp, mobileOtpKey: otpKey };
    },

    verifyMobileOtp: (phoneNumber, phoneOtp, phoneOtpKey) => {
        let [hashValue, expires] = phoneOtpKey.split(".");
        let now = new Date().getTime();
        if (now > parseInt(expires)) {
            return false;
        }
        let checkPhoneOtp = `${phoneNumber}.${phoneOtp}.${expires}`;
        let newCalculatedHash = crypto.createHmac("sha256", "mobileotpkey").update(checkPhoneOtp).digest("hex");
        if (newCalculatedHash === hashValue) {
            return true;
        } else {
            return false;
        }
    },

    validateCountryCode: (countryCode) => {
        const countryCodes = ["+91", "+93", "+54", "+43"];
        let check_country_code = countryCodes.includes(countryCode);
        return check_country_code;
    }

}