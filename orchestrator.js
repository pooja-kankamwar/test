'use strict';
const loggerLib = require('../libraries/loggerLib');
const orchestratorService = require('../services/orchestrator')
const constants = require('../constants')

// Main handler for applanga to db sync
module.exports.handler = async event => {
  let sqlConnection;
  let data;
  let response;
  try {
    const response = await orchestratorService.sendTaskMessage();
    return {
      statusCode: constants.STATUS_CODE.SUCCESS,
      body: JSON.stringify({
              message: response
          },
          null,
          2
      ),
    };
  } catch (error) {
      loggerLib.createLog(event, `Error occured in main handler AnalyticsCalculation: `, error);
      return {
          statusCode: constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
          body: JSON.stringify({
                  message: error
              },
              null,
              2
          ),
      };
  }
};