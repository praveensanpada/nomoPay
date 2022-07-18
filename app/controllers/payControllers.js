
const validationHelpers = require("../customs/customFunctions/validationHelpers")
const responseHelpers = require("../customs/customFunctions/responseHelpers")
const customMessages = require("../customs/customMessages/customMessages")
const userServices = require("../services/userServices")
const payService = require("../services/payService")
var bcrypt = require('bcrypt');
var { compareSync } = require('bcrypt');
const { get } = require("request")
const Razorpay = require('razorpay');
const { checkout } = require("../routes/payRoutes")

const instance = new Razorpay({
    key_id: 'rzp_test_DbBVnYRitqzT3S',
    key_secret: 'hZ0tjXg2EU4m8qM8QLHP3hMd'
});

module.exports = {

    addToKyc: async (req, res) => {

        let {
            user_id,
            isAdhar,
            isPan,
            isBank
        } = req.body;

        var check_body_data = [user_id, isAdhar, isPan, isBank]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            const findUserByUserId = await userServices.findUserByUserId(user_id);
            if (!findUserByUserId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (findUserByUserId.length > 0) {
                    if (findUserByUserId[0].isUserBlocked) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "USER_BLOCK", "User blocked"))
                    } else {
                        if (findUserByUserId[0].isKycDone) {
                            res.send(responseHelpers.RES_SUCCESS_FUNCTION(true, true, 200, "SUCCESS", "Data Returned", "Kyc Already Done"))
                        } else {
                            const getKycByUserId = await payService.getKycByUserId(user_id);
                            if (!getKycByUserId) {
                                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                            } else {
                                if (getKycByUserId.length > 0) {
                                    const updateKycByUserId = await payService.updateKycByUserId(user_id, isAdhar, isPan, isBank);
                                    if (!updateKycByUserId) {
                                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                                    } else {
                                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Kyc Updated"))
                                    }
                                } else {
                                    const addToKyc = await payService.addToKyc(user_id, isAdhar, isPan, isBank);
                                    if (!addToKyc) {
                                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                                    } else {
                                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Kyc Added"))
                                    }
                                }
                            }
                        }
                    }
                } else {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, true, 502, "EMAIL_NF", "User not found"))
                }
            }
        }
    },

    addToCurrency: async (req, res) => {

        let {
            currency_name,
            country_symbol,
            description
        } = req.body;

        var check_body_data = [currency_name, country_symbol, description]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            const getCurrencyByCurrencySymbol = await payService.getCurrencyByCurrencySymbol(country_symbol);
            if (!getCurrencyByCurrencySymbol) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (getCurrencyByCurrencySymbol.length > 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "CURRENCY_F", "Currency found"))
                } else {
                    const addToCurrency = await payService.addToCurrency(currency_name, country_symbol, description);
                    if (!addToCurrency) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                    } else {
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Currency Added"))
                    }
                }
            }
        }
    },

    // ===================
    addToPin: async (req, res) => {
        let {
            user_id,
            myPin
        } = req.body;

        var check_body_data = [user_id, myPin]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            const getPinByUserId = await payService.getPinByUserId(user_id);
            if (!getPinByUserId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (getPinByUserId.length > 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "PIN_F", "User pin found"))
                } else {
                    // let hashPin = await bcrypt.hash(myPin, 10);
                    const addToPin = await payService.addToPin(user_id, myPin);
                    if (!addToPin) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                    } else {
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Pin Added"))
                    }
                }
            }
        }
    },

    resetPin: async (req, res) => {
        let {
            user_id,
            myPin
        } = req.body;
        var check_body_data = [user_id, myPin]
        if (validationHelpers.validateBodyData(check_body_data)) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            const getPinByUserId = await payService.getPinByUserId(user_id);
            if (!getPinByUserId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (getPinByUserId.length == 0) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "PIN_NF", "User pin not found"))
                } else {
                    // let hashPin = await bcrypt.hash(myPin, 10);
                    const resetPinByUserId = await payService.resetPinByUserId(user_id, myPin);
                    if (!resetPinByUserId) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                    } else {
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Pin reset"))
                    }
                }
            }
        }
    },

    addToWallet: async (req, res) => {

        let {
            user_id,
            country_id,
            amount
        } = req.body;

        var check_body_data = [user_id, country_id, amount]
        if (validationHelpers.validateBodyData(check_body_data) || amount <= 0) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            const getWalletByUserId = await payService.getWalletByUserId(user_id);
            if (!getWalletByUserId) {
                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
            } else {
                if (getWalletByUserId.length == 0) {
                    const addToWallet = await payService.addToWallet(user_id, country_id, amount);
                    if (!addToWallet) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                    } else {
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Amount added"))
                    }
                } else {
                    let fAmount = getWalletByUserId[0].dataValues.amount + amount
                    const updateWallet = await payService.updateWallet(user_id, fAmount);
                    if (!updateWallet) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query"))
                    } else {
                        res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", "Amount updated"))
                    }
                }
            }
        }
    },

    checkout: async (req, res) => {

        let {
            name,
            contact,
            email,
            amount
        } = req.body;

        var createCus = {
            name: name,
            contact: contact,
            email: email,
            fail_existing: 0
        }

        var checkoutPay = {
            amount: amount * 100,
            currency: 'INR',
        };

        var check_body_data = [name, contact, email, amount]
        if (validationHelpers.validateBodyData(check_body_data) || amount <= 0) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            instance.customers.create(createCus, async (err, createCus_Res) => {
                if (err) {
                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "RazorPayError", "Error in RazorPay Create Customer"))
                } else {
                    const addToCustomer = await payService.addToCustomer(createCus_Res.id, createCus_Res.entity, createCus_Res.name, createCus_Res.email, createCus_Res.contact);
                    if (!addToCustomer) {
                        res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query1"))
                    } else {
                        instance.orders.create(checkoutPay, async (err, checkoutPay_Res) => {
                            if (err) {
                                res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "RazorPayError", "Error in RazorPay Create Order"))
                            } else {
                                const addToOrder = await payService.addToOrder(checkoutPay_Res.id, checkoutPay_Res.entity, checkoutPay_Res.amount, checkoutPay_Res.amount_paid, checkoutPay_Res.currency);
                                if (!addToOrder) {
                                    res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 501, "INTERNAL_SERVER_ERROR", "Error in query2"))
                                } else {
                                    var obj = {
                                        customer_id: createCus_Res.id,
                                        customer_name: createCus_Res.name,
                                        customer_email: createCus_Res.email,
                                        customer_contact: createCus_Res.contact,
                                        order_id: checkoutPay_Res.id,
                                        order_amount: checkoutPay_Res.amount / 100,
                                        order_currency: checkoutPay_Res.currency
                                    }
                                    res.send(responseHelpers.RES_SUCCESS_FUNCTION(false, true, 200, "SUCCESS", "Data Returned", obj))
                                }
                            }
                        });
                    }
                }
            })
        }
    },

    payment: async (req, res) => {

        let {
            customer_id,
            customer_name,
            customer_email,
            customer_contact,
            order_id,
            order_amount,
            order_currency,
            razorpay_signature
        } = req.body;

        var check_body_data = [customer_id, customer_name, customer_email, customer_contact, order_id, order_amount, order_currency, razorpay_signature]
        if (validationHelpers.validateBodyData(check_body_data) || order_amount <= 0) {
            res.send(responseHelpers.RES_ERROR_FUNCTION(true, false, 402, "BAD_REQUEST", "Body missing params"))
        } else {
            res.send("DONE")
        }

    }







}