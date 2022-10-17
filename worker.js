'use strict';
const loggerLib = require('../libraries/loggerLib');
const constants = require('../constants');
module.exports.handler = async event => {
  let data;
  let response;
  let taskName;
  try {
    const [record] = event.Records;
    const {clientId, clientName, processName} = JSON.parse(record.body);
    taskName = `${clientId} - ${clientName} - ${processName}`
    // check whether process is supported or not
    let found = Object.values(constants.ANALYTIC_PROCESS).find(p=> p.processName === processName);
    if (!found) {
      found = Object.values(constants.FUNDAMENTAL_PROCESS).find(p=> p.processName === processName);
    }
    if (!found) {
      throw new Error(`Error ${taskName} - Unsupported process`)
    }
    if (!found.enable) {
      throw new Error(`Error ${taskName} -  Process not enabled`)
    }
    console.log(`Analytics Worker start for ${taskName}`);
    const taskService = require(`../services/${processName}`);
    const params = {clientId, clientName, processName}
    if (processName === 'compliance') {
      response = await taskService.processCalculation(params);
    } else {
      response = await taskService.processCalculation(clientId);
    }
    loggerLib.createLog(event, `End execution of Analytics Calculation : `, '');
    return {
      statusCode: constants.STATUS_CODE.SUCCESS,
      body: JSON.stringify({
              message: `Finished Analytics worker for ${taskName}`
          },
          null,
          2
      ),
    };
  } catch (error) {
      loggerLib.createLog(event, `Error occured in main handler AnalyticsCalculation - ${taskName}: `, error);
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