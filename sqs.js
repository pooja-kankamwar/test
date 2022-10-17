
const {AWS} = require('../packages');
// const awsXRay = require('aws-xray-sdk');
// const AWS = awsXRay.captureAWS(require('aws-sdk'));
const sqs = new AWS.SQS({ region: process.env.REGION });
const constants = require('../constants');

const sqsCreateQueue = async (queueName)=> {
  try {
    AWS.config.update({
      region: process.env.REGION
    });
    console.log(`sqs create queue ${queueName} called`);
    const params = {
      QueueName: queueName ? queueName : constants.QUEUE_NAME,
    };
    const queue = await sqs.createQueue(params).promise();
    return queue;
  } catch (error) {
    console.error(`Error when creating queue: ${error}`)
    throw error;
  }
}

module.exports.sendMessage = async (queueName, data) => {
  try {
    const sqsQueue = await sqsCreateQueue(queueName);
    const params = {
      QueueUrl: sqsQueue.QueueUrl,
      MessageBody: JSON.stringify(data)
    }
    const sendResponse = await sqs.sendMessage(params).promise();
    console.log('Send Queue success');
    return sendResponse;
  } catch (err) {
    console.error(`Error in Send  message in Queue ${queueName} - ${err}`)
    throw(err)
  }
}