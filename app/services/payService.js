

const db = require("../models/index");
const { Op } = require("sequelize");

module.exports = {

    // ===== kyc =====
    addToKyc: async (user_id, isAdhar, isPan, isBank) => {
        const addKyc = {
            user_id: user_id,
            isAdhar: isAdhar,
            isPan: isPan,
            isBank: isBank
        }
        const result = await db.kyc.create(addKyc).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    getKycByUserId: async (user_id) => {
        const result = await db.kyc.findAll({ where: { user_id: user_id } }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    updateKycByUserId: async (user_id, isAdhar, isPan, isBank) => {
        const updateKyc = {
            isAdhar: isAdhar,
            isPan: isPan,
            isBank: isBank
        }
        const result = await db.kyc.update(updateKyc, {
            where: { user_id: user_id }
        }).then(data => {
            if (data == 1) {
                return data;
            } else {
                return false;
            }
        }).catch(() => {
            return false;
        })
        return result;
    },

    // ===== currency =====
    addToCurrency: async (currency_name, country_symbol, description) => {
        const addCurrency = {
            currency_name: currency_name,
            country_symbol: country_symbol,
            description: description
        }
        const result = await db.currency.create(addCurrency).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    getCurrencyByCurrencySymbol: async (country_symbol) => {
        const result = await db.currency.findAll({ where: { country_symbol: country_symbol } }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    // ===== pin =====
    addToPin: async (user_id, myPin) => {
        const addPin = {
            user_id: user_id,
            myPin: myPin
        }
        const result = await db.pin.create(addPin).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    getPinByUserId: async (user_id) => {
        const result = await db.pin.findAll({ where: { user_id: user_id } }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    resetPinByUserId: async (user_id, myPin) => {
        const resetPin = {
            myPin: myPin
        }
        const result = await db.pin.update(resetPin, {
            where: { user_id: user_id }
        }).then(data => {
            if (data == 1) {
                return data;
            } else {
                return false;
            }
        }).catch(() => {
            return false;
        })
        return result;
    },

    // ===== wallet =====
    addToWallet: async (user_id, country_id, amount) => {
        const addWallet = {
            user_id: user_id,
            country_id: country_id,
            amount: amount
        }
        const result = await db.wallet.create(addWallet).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    getWalletByUserId: async (user_id) => {
        const result = await db.wallet.findAll({ where: { user_id: user_id } }).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    updateWallet: async (user_id, amount) => {
        const updWallet = {
            amount: amount
        }
        const result = await db.wallet.update(updWallet, {
            where: { user_id: user_id }
        }).then(data => {
            if (data == 1) {
                return data;
            } else {
                return false;
            }
        }).catch(() => {
            return false;
        })
        return result
    },

    // ===== payment =====
    addToPayment: async (user_id, currency_id, order_id, amount) => {
        const addPayment = {
            user_id: user_id,
            currency_id: currency_id,
            order_id: order_id,
            amount: amount
        }
        const result = await db.payment.create(addPayment).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    // ===== transaction =====
    addToTransaction: async (user_id, currency_id, upi_id, description, status, wallet_id, txn_id, dest_id, payment_id) => {
        const addPayment = {
            user_id: user_id,
            currency_id: currency_id,
            order_id: order_id,
            amount: amount
        }
        const result = await db.transaction.create(addPayment).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    },

    // ===== razorpay =====
    addToCustomer: async (cust_id, cust_entity, cust_name, cust_email, cust_contact) => {
        const addCustomer = {
            cust_id: cust_id,
            cust_entity: cust_entity,
            cust_name: cust_name,
            cust_email: cust_email,
            cust_contact: cust_contact
        }
        const result = await db.RazCustomer.create(addCustomer).then((data) => {
            return data;
        }).catch((err) => {
            return false;
        })
        return result
    },

    addToOrder: async (ord_id, ord_entity, ord_amount, ord_amount_paid, ord_currency) => {
        const addOrder = {
            ord_id: ord_id,
            ord_entity: ord_entity,
            ord_amount: ord_amount,
            ord_amount_paid: ord_amount_paid,
            ord_currency: ord_currency
        }
        const result = await db.RazOrder.create(addOrder).then((data) => {
            return data;
        }).catch(() => {
            return false;
        })
        return result
    }

}