

module.exports = {

    RES_ERROR_FUNCTION: (isError, showUser, statusCode, msgCode, message) => {
        return JSON.stringify({ "isError": isError, "showUser": showUser, "statusCode": statusCode, "msgCode": msgCode, "message": message })
    },

    RES_SUCCESS_FUNCTION: (isError, showUser, statusCode, msgCode, message, response) => {
        return JSON.stringify({ "isError": isError, "showUser": showUser, "statusCode": statusCode, "msgCode": msgCode, "message": message, "response": response })
    }

}