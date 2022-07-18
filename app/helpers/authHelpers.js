
const JWT = require('jsonwebtoken')
// const client = require('./redisHelpers')
const customMessages = require("../customs/customMessages/customMessages")
const responseHelpers = require("../customs/customFunctions/responseHelpers")

module.exports = {

    signAccessToken: (user_id) => {
        return new Promise((resolve, reject) => {
            const payload = {
                user_id: user_id
            }
            const secret = "mykeys"
            const options = {
                expiresIn: '1h'
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Error in access token"))
                } else {
                    resolve(token)
                }
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) {
            return next(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Unauthorized"))
        } else {
            const authHeader = req.headers['authorization']
            const token = authHeader;
            JWT.verify(token, "mykeys", (err, payload) => {
                if (err) {
                    return next(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Unauthorized"))
                } else {
                    req.payload = payload
                    next()
                }
            })
        }
    },

    signRefreshToken: (user_id, login_id) => {
        return new Promise((resolve, reject) => {
            const payload = {
                user_id: user_id,
                login_id: login_id
            }
            const secret = "mykeys"
            const options = {
                expiresIn: '1y'
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Error in refresh token"))
                } else {
                    resolve(token)
                    // client.SET(login_id, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                    //     if (err) {
                    //         reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "ERROR IN REDIS REFRESH TOKEN CREATION"))
                    //     } else {
                    //         resolve(token)
                    //     }
                    // })
                }
            })
        })
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                "mykeys",
                (err, payload) => {
                    if (err) {
                        return reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Unauthorized"))
                    } else {
                        if (refreshToken === result) {
                            return resolve(payload)
                        } else {
                            return reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Unauthorized"))
                        }
                        // const login_id = payload.login_id
                        // client.GET(login_id, (err, result) => {
                        //     if (err) {
                        //         reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "ERROR IN REDIS REFRESH TOKEN GET"))
                        //     } else {
                        //         if (refreshToken === result) {
                        //             return resolve(payload)
                        //         } else {
                        //             return reject(responseHelpers.RES_ERROR_FUNCTION(customMessages.STATUS.STATUS_500, "Unauthorized"))
                        //         }
                        //     }
                        // })
                    }
                }
            )
        })
    },
}
