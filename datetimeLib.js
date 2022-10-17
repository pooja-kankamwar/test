const {moment} = require('../packages');

function changeDateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(format);
}

module.exports = {
    changeDateFormat
}