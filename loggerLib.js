const createLog = function(event, message, data) {
    let output = {
        event,
        environment: process.env.ENVIRONMENT,
        message,
        info: data && data.stack ? data.stack : data && data.message ? data.message : data
    }
    console.log(JSON.stringify(output));
}

module.exports = {
    createLog
}