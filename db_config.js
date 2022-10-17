'use strict';
// for local connection-------------
const {AWS, mySql} = require('../packages');
// const awsXRay = require('aws-xray-sdk');
// const AWS = awsXRay.captureAWS(require('aws-sdk'));
const secretsManager = require('./secretsManager');
const constants = require('../constants');
const client_secrets_manager = new AWS.SecretsManager();
module.exports.connectMasterMysql = async () => {
  try {
      const connectionConfig = await secretsManager.getMysqlConnectionConfig(constants.MASTER_CLIENT_ID, constants.REGION); 
      const connection = await mySql.createConnection({
          host: connectionConfig.host,
          user: connectionConfig.username,
          password: connectionConfig.password,
          database: "research"
      });
      return connection;
  } catch (error) {
    console.log('error in connectMysql')
    console.log(error)
      throw error;
  }
}
module.exports.connectResearchMysql = async (clientId) => {
    try {
        const connectionConfig = await secretsManager.getMysqlConnectionConfig(clientId, constants.REGION); 
        const connection = await mySql.createConnection({
            host: connectionConfig.host,
            user: connectionConfig.username,
            password: connectionConfig.password,
            database: "research"
        });
        return connection;
    } catch (error) {
      console.log('error in connectMysql')
      console.log(error)
        throw error;
    }
}

module.exports.connectResearchResponseMysql = async (clientId) => {
  try {
      const connectionConfig = await secretsManager.getMysqlConnectionConfig(clientId,constants.REGION); 
      const connection = await mySql.createConnection({
          host: connectionConfig.host,
          user: connectionConfig.username,
          password: connectionConfig.password,
          database: "research_response"
      });
      return connection;
  } catch (error) {
    console.log('error in connectMysql')
    console.log(error)
      throw error;
  }
}
