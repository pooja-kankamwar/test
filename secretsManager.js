const { AWS } = require('../packages');
const constants = require('../constants');

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: constants.REGION
});

// function to retreive mysql database credentials from secrets manager
const getMysqlConnectionConfig = async function(clientId, region) {
    if (region) {
        client = new AWS.SecretsManager({
            region: region
        });
    }
    let mysqlSecretName = constants.SECRETE_MANAGER_ENV + '/' + clientId + '/' + constants.SECRETE_MANAGER.MYSQL_SECRETE_NAME;
    console.log('Fetching details for ', mysqlSecretName);
    try {
        return new Promise((resolve, reject) => {
            client.getSecretValue({ SecretId: mysqlSecretName }, function(err, data) {
                if (err) {
                    // handle all exceptions and take appropriate actions
                    reject(err);
                } else {
                    const obj = JSON.parse(data.SecretString);
                    resolve(obj);
                }
            });
        });
    } catch (error) {
        console.log('Error in function getMysqlConnectionConfig:', error);
        throw error;
    }
}

module.exports = {
    getMysqlConnectionConfig
}