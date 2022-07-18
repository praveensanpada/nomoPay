
module.exports = {



    // ========= NEW ==========

    statusCode: {
        200: "SUCCESS",
        401: "UNAUTH",
        402: "BAD_REQUEST",
        403: "FORBIDDEN",
        404: "DATA_NOT_FOUND",
        409: "DATABASE_CONNECT",
        500: "INTERNAL_SERVER_ERROR",
        501: "UNABLE_TO_PROCESS",
        502: "UNABLE_TO_PROCESS"
    },

    msgCode: {
        INVLD_PSWRD: "INVLD_PSWRD",
        EMAIL_NF: "EMAIL_NF",
        INVLD_PHNE: "INVLD_PHNE",
        SUCCESS: "SUCCESS",
        BAD_REQUEST: "BAD_REQUEST",
        UNAUTH: "UNAUTH",
        FORBIDDEN: "FORBIDDEN"
    },

    message: {
        INVLD_PSWRD: "Incorrect password",
        EMAIL_NF: "Email not found",
        INVLD_PHNE: "Phone number not correct",
        SUCCESS: "Success",
        BAD_REQUEST: "Bad request",
        UNAUTH: "Unauthorised Response",
        FORBIDDEN: "Forbidden Response"
    },

    // ========= OLD ==========

    MESSAGES: {

        INVALID_TOKEN: "Invalid token.",
        ACCESS_DENIED: "Access denied! Unauthorized user.",
        BODY_MISSING: "It seems that some body parameter is missing. Please reach to support.",
        PASS_LENGTH_ERROR: "Password must be greater than 6 and less than 30 characters.",
        QUERY_FAILED: "We were unable to fetch the data .Please try again.",
        USER_NOT_FOUND: "Sorry we could not find any user with this Mobile / Email. Please try again.",
        PENDING_VERIFICATION: "Account verification still pending. Please verify.",
        SUCCESS_VERIFICATION: "Account verification success.",
        ENCRYP_FAILED: "Sorry, password encryption failed. Please try again later.",
        DATA_RETURNED: "Data returned successfully.",
        INCORRECT_PIN: "Pin / Password you entered seems invalid. Please try again.",
        ACCOUNT_DISABLED: "Sorry, Your account has been disabled. Please contact support.",
        OTP_SENT: "OTP has been sent successfully.",
        SOMETHING_WRONG: "Something went wrong. Please try again later.",
        MOBILE_INVALID: "Mobile number you entered seems invalid. Please try again.",
        OTP_INVALID: "Your OTP seems invalid. Please try again.",
        OTP_EXPIRED: "Sorry, OTP seems to have expired. Please re-send the OTP.",
        OTP_INCORRECT: "Your OTP seems incorrect. Please try again.",
        DB_CON_FAILED: "We ran into some tech glitch. Please try again later.",

    },


    STATUS: {

        STATUS_200: {
            status_code: "200",
            status_description: "SUCCESS",
            status_message: "Result success."
        },

        STATUS_401: {
            status_code: "401",
            status_description: "BODY_PARAM_MISSING",
            status_message: "It seems that some body parameter is missing. Please reach to support."
        },

        STATUS_402: {
            status_code: "402",
            status_description: "BAD_REQUEST",
            status_message: "The server could not understand the request due to invalid syntax."
        },

        STATUS_404: {
            status_code: "404",
            status_description: "DATA_NOT_FOUND",
            status_message: "We could not find any data. Please try again."
        },

        STATUS_409: {
            status_code: "409",
            status_description: "DATABASE_CONNECT",
            status_message: "Connection to database failed. Please try again later."
        },

        STATUS_500: {
            status_code: "500",
            status_description: "INTERNAL_SERVER_ERROR",
            status_message: "Unable to get data from database."
        },

        STATUS_501: {
            status_code: "501",
            status_description: "UNABLE_TO_PROCESS",
            status_message: "CRUD operation could not be completed."
        },

        STATUS_502: {
            status_code: "502",
            status_description: "UNABLE_TO_PROCESS",
            status_message: "Data Invalid / Expired can not process."
        },

    }

}