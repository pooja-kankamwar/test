const firstCapitalEnv = process.env.ENVIRONMENT.replace(/^\w/, c => c.toUpperCase());
const lowerCaseEnv = process.env.ENVIRONMENT.replace(/^\w/, c => c.toLowerCase());
const constants = {
    //Environment constants
    ENVIRONMENT: process.env.ENVIRONMENT,
    SECRETE_MANAGER_ENV: firstCapitalEnv,
    REGION: process.env.REGION,
    MASTER_CLIENT_ID: process.env.CLIENT_ID,
    // Secrete manage constants
    SECRETE_MANAGER: {
        MYSQL_SECRETE_NAME: 'MySQL',
        APPLANGA_STATIC_SECRETE_NAME: 'StaticAppLangaCredentials'
    },
    // Status constants
    STATUS_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
        UNAUTHORIZED: 401
    },
    //Sns Topic Name
    TOPIC_NAME: `analytics-sns-${firstCapitalEnv}`,
    QUEUE_NAME: `analytics-queue-${lowerCaseEnv}`,
    ANALYTIC_PROCESS: {
      COMPLIANCE: {
        processName: 'compliance',
        serviceName: 'compliance',
        enable: true,
      },
      ENROLLMENT: {
        processName: 'enrollment',
        serviceName: 'enrollment',
        enable: true,
      },
      DATA_COLLECTION: {
        processName: 'dataCollection',
        serviceName: 'dataCollection',
        enable: true,
      },
      ENGAGEMENT: {
        processName: 'engagement',
        serviceName: 'engagement',
        enable: false,
      },
      CLOSE_OUT: {
        processName: 'closeOut',
        serviceName: 'closeOut',
        enable: false,
      },
    },
    FUNDAMENTAL_PROCESS: {
      FUNDAMENTAL: {
        processName: 'fundamental',
        serviceName: 'fundamental',
        enable: true,
      },
    },
    DATABASE: {
      RESEARCH_DB: 'research',
      RESEARCH_RESPONSE_DB: 'research_response',
      RESEARCH_ANALYTICS_DB: 'research_analytics'
    }
};

module.exports = constants;