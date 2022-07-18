const moment = require('moment');

module.exports = {

    log_timestamp: () => {
        return moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
    }

}