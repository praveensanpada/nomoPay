
const validationHelpers = require("../customs/customFunctions/validationHelpers")
const responseHelpers = require("../customs/customFunctions/responseHelpers")
const customMessages = require("../customs/customMessages/customMessages")
const userServices = require("../services/userServices")
var bcrypt = require('bcrypt');
var { compareSync } = require('bcrypt');
const { signAccessToken, signRefreshToken } = require('../helpers/authHelpers');
const db = require("../models");

module.exports = {

    // ----------------------------------- SingUp -----------------------------------------------

    createEmailOtp: async (req, res) => {

        let {
            email,
        } = req.body;

        var check_body_data = [email]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else if (!validationHelpers.validateEmail(email)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_EMAIL", "Email validation failed"))
        } else {
            const findUserByEmailId = await userServices.findUserByEmailId(email);
            if (!findUserByEmailId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (findUserByEmailId.length > 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "EMAIL_F", "Email already exit"))
                } else {
                    const response = validationHelpers.emailCreateOtp(email);
                    res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", response))
                }
            }
        }
    },

    verifyEmailOtp: async (req, res) => {

        let {
            email,
            emailOtpKey,
            emailOtp,
            password,
            firstName,
            lastName
        } = req.body;

        var check_body_data = [email, emailOtp, emailOtpKey, password, firstName, lastName]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else if (!validationHelpers.validateEmail(email)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_EMAIL", "Email validation failed"))
        } else if (!validationHelpers.validatePassword(password)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PSWRD", "Password validation failed"))
        } else if (!validationHelpers.validateName(firstName)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_NAME", "Name validation failed"))
        } else {
            const findUserByEmailId = await userServices.findUserByEmailId(email);
            if (!findUserByEmailId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (findUserByEmailId.length > 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "EMAIL_F", "Email already exit"))
                } else {
                    const response = validationHelpers.verifyEmailOtp(email, emailOtp, emailOtpKey);
                    if (!response) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, "EMAIL_VFLD", "Email veriification failed"))
                    } else {
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Email veriification success"))
                    }
                }
            }
        }
    },

    createPhoneOtp: async (req, res) => {

        let {
            phoneNumber,
            countryCode
        } = req.body;

        var check_body_data = [phoneNumber, countryCode]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else if (!validationHelpers.validateMobile(phoneNumber)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PHONE", "Phone number validation failed"))
        } else if (!validationHelpers.validateCountryCode(countryCode)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_CONTRYCODE", "Country code validation failed"))
        } else {
            const findUserByPhoneNumber = await userServices.findUserByPhoneNumber(countryCode, phoneNumber);
            if (!findUserByPhoneNumber) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (findUserByPhoneNumber.length > 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "PHONE_F", "Phone number exit"))
                } else {
                    const response = validationHelpers.mobileCreateOtp(phoneNumber);
                    res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", response))
                }
            }
        }
    },

    verifyPhoneOtp: async (req, res) => {

        let {
            email,
            password,
            firstName,
            lastName,
            countryCode,
            phoneNumber,
            phoneOtpKey,
            phoneOtp
        } = req.body;

        var check_body_data = [email, password, firstName, phoneNumber, countryCode, phoneOtp, phoneOtpKey]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else if (!validationHelpers.validateEmail(email)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_EMAIL", "Email validation failed"))
        } else if (!validationHelpers.validateName(firstName)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_NAME", "Name validation failed"))
        } else if (!validationHelpers.validateMobile(phoneNumber)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PHONE", "Phone number validation failed"))
        } else if (!validationHelpers.validateCountryCode(countryCode)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_CONTRYCODE", "Country code validation failed"))
        } else if (!validationHelpers.validatePassword(password)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PASWRD", "Password validation failed"))
        } else {
            const findUserByEmailId = await userServices.findUserByEmailId(email);
            if (!findUserByEmailId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (findUserByEmailId.length > 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "EMAIL_F", "Email already exit"))
                } else {
                    const findUserByPhoneNumber = await userServices.findUserByPhoneNumber(countryCode, phoneNumber);
                    if (!findUserByPhoneNumber) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                    } else {
                        if (findUserByPhoneNumber.length > 0) {
                            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "PHONE_F", "phone number already exit"))
                        } else {
                            const response = validationHelpers.verifyMobileOtp(phoneNumber, phoneOtp, phoneOtpKey);
                            if (!response) {
                                res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, "PHONE_VFLD", "Mobile verification failed"))
                            } else {
                                let hashPass = await bcrypt.hash(password, 10);
                                let user = {
                                    "email": email,
                                    "phoneNumber": phoneNumber,
                                    "password": hashPass,
                                    "isGoogleAccount": 0,
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "countryCode": countryCode,
                                    "birthDate": 12 / 09 / 2002,
                                    "isPhoneVerified": 1,
                                    "isEmailVerified": 1,
                                    "isAppDark": 0,
                                    "isAppLite": 1,
                                    "isUserBlocked": 0,
                                    "userBlockReason": "",
                                    "isKycDone": 0,
                                    "bankProof": 0,
                                    "governmentId": 0,
                                }
                                const addNewUser = await userServices.addNewUser(user);
                                if (!addNewUser) {
                                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                                } else {
                                    const user_id = addNewUser.dataValues.id
                                    const accessToken = await signAccessToken(user_id)
                                    const refreshToken = await signRefreshToken(user_id)
                                    const final_response = {
                                        uuid: user_id,
                                        accessToken: accessToken,
                                        refreshToken: refreshToken,
                                        message: "Mobile verification success/ New user added"
                                    }
                                    res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", final_response))
                                }
                            }
                        }
                    }
                }
            }
        }
    },


    // ----------------------------------- SingIn -----------------------------------------------

    login: async (req, res, next) => {

        let {
            email,
            phoneNumber,
            countryCode,
            password,
        } = req.body;

        if (validationHelpers.validateEmail(email)) {
            var check_body_data = [email, password]
            if (validationHelpers.validateBodyData(check_body_data)) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
            } else if (!validationHelpers.validatePassword(password)) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PASWRD", "Password validation failed"))
            } else {
                const findUserByEmailId = await userServices.findUserByEmailId(email);
                if (!findUserByEmailId) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                } else {
                    if (findUserByEmailId.length > 0) {
                        const user_id = findUserByEmailId[0].dataValues.id
                        const user_email = findUserByEmailId[0].dataValues.email
                        const user_pass = findUserByEmailId[0].dataValues.password
                        if (email == user_email) {
                            const check_pass = compareSync(password, user_pass);
                            if (check_pass) {
                                const accessToken = await signAccessToken(user_id)
                                const refreshToken = await signRefreshToken(user_id)
                                const final_response = {
                                    uuid: user_id,
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    message: "Email login success"
                                }
                                res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", final_response))
                            } else {
                                res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "WRONG_PASWRD", "Wrong password"))
                            }
                        } else {
                            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "EMAIL_NF", "Email not exit"))
                        }
                    } else {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "EMAIL_NF", "Email not exit"))
                    }
                }
            }
        } else if (validationHelpers.validateMobile(phoneNumber)) {
            var check_body_data = [phoneNumber, countryCode, password]
            if (validationHelpers.validateBodyData(check_body_data)) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
            } else if (!validationHelpers.validatePassword(password)) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PASWRD", "Password validation failed"))
            } else if (!validationHelpers.validateCountryCode(countryCode)) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_CONTRYCODE", "Country code validation failed"))
            } else {
                const findUserByPhoneNumber = await userServices.findUserByPhoneNumber(countryCode, phoneNumber);
                if (!findUserByPhoneNumber) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                } else {
                    if (findUserByPhoneNumber.length > 0) {
                        const user_id = findUserByPhoneNumber[0].dataValues.id
                        const user_phoneNumber = findUserByPhoneNumber[0].dataValues.phoneNumber
                        const user_pass = findUserByPhoneNumber[0].dataValues.password
                        if (phoneNumber == user_phoneNumber) {
                            const check_pass = compareSync(password, user_pass);
                            if (check_pass) {
                                const response = validationHelpers.mobileCreateOtp(phoneNumber);
                                const final_response = {
                                    uuid: user_id,
                                    mobile: response.mobile,
                                    phoneOtp: response.mobileOtp,
                                    phoneOtpKey: response.mobileOtpKey,
                                    message: "Mobile login success"
                                }
                                // const accessToken = await signAccessToken(user_id)
                                // const refreshToken = await signRefreshToken(user_id)
                                // const final_response = {
                                //     uuid: user_id,
                                //     accessToken: accessToken,
                                //     refreshToken: refreshToken,
                                //     message: "Mobile login success"
                                // }
                                res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", final_response))
                            } else {
                                res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "WRONG_PASWRD", "Wrong password"))
                            }
                        } else {
                            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "PHONE_NF", "Phone number not exit"))
                        }
                    } else {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "PHONE_NF", "Phone number not exit"))
                    }
                }
            }
        } else {
            res.send(responseHelpers.RES_SUCCESS_FUNCTION(true, true, 502, "EMAIL_PHONE_IVALD", "Email/Mobile validation failed"))
        }
    },

    verifyUser: async (req, res) => {

        let {
            phoneNumber,
            countryCode,
            phoneOtpKey,
            phoneOtp
        } = req.body;

        var check_body_data = [phoneNumber, countryCode, phoneOtp, phoneOtpKey]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else if (!validationHelpers.validateMobile(phoneNumber)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_PHONE", "Phone number validation failed"))
        } else if (!validationHelpers.validateCountryCode(countryCode)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 500, "INVLD_CONTRYCODE", "Country code validation failed"))
        } else {
            const findUserByPhoneNumber = await userServices.findUserByPhoneNumber(countryCode, phoneNumber);
            if (!findUserByPhoneNumber) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (findUserByPhoneNumber.length > 0) {
                    const response = validationHelpers.verifyMobileOtp(phoneNumber, phoneOtp, phoneOtpKey);
                    if (!response) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, "PHONE_VFLD", "Mobile verification failed"))
                    } else {
                        const user_id = findUserByPhoneNumber[0].dataValues.id
                        const accessToken = await signAccessToken(user_id)
                        const refreshToken = await signRefreshToken(user_id)
                        const final_response = {
                            user_id: findUserByPhoneNumber[0].dataValues.id,
                            firstName: findUserByPhoneNumber[0].dataValues.firstName,
                            lastName: findUserByPhoneNumber[0].dataValues.lastName,
                            isUserBlocked: findUserByPhoneNumber[0].dataValues.isUserBlocked,
                            isAppDark: findUserByPhoneNumber[0].dataValues.isAppDark,
                            isAppLite: findUserByPhoneNumber[0].dataValues.isAppLite,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", final_response))
                    }
                } else {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "PHONE_NF", "Phone number not exit"))
                }
            }
        }
    },
}