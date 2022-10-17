const BaseModel = require("./baseModel");
const {DATABASE: {RESEARCH_RESPONSE_DB}} = require('../constants')
const queries = require('../calculations/compliance');
const { Promise } = require('../packages');
/**
 * Class representing a message model.
 * @class
 */
class ComplianceModel extends BaseModel {
    /**
     * Constructor.
     *
     * @param  {Object}  opts
     */
    constructor( opts ) {
        super( opts );
        this.table = "compliance";
        this._hasTimestamps = false;
        this.clientId = opts.clientId;
    }

    async startComplianceCalculations(){
        const dbConnectionPool = await this._initDbConnectionPool(this.clientId, RESEARCH_RESPONSE_DB);
        queries.sort((a,b)=> {
          a.queryOrder - b.queryOrder
        })
        let data = {};
        try {
          const complianceClientProcess = `compliance - ${this.clientId}`;
          const participantSql = `select count(*) as totalParticipant from research_analytics.participant_site_country`
          const [participantData] = await dbConnectionPool.query(participantSql, null)
          console.log(`the length for getParticipantSiteCountry: ${JSON.stringify(participantData)}`)
          console.time(`${complianceClientProcess} Compliance Calculation Done in`);
          await Promise.mapSeries(queries, async(q)=>{
            const queryNameClient = `${q.queryName} - ${this.clientId}`;
            console.log(`Start running queries Query Order: ${q.queryOrder} -  ${queryNameClient}`);
            console.time(`${queryNameClient} query finished in`);
            const rawDatas = await dbConnectionPool.query(q.queryStr);
            data = rawDatas[0];
            console.timeEnd(`${queryNameClient} query finished in`);
            console.log(`The result for ${queryNameClient} query is: ${JSON.stringify(rawDatas)}`);
            // If want to do actions after each query, do like below
            // if (q.queryName === 'select_query_sample') {
            //   data is array of d
            //   d.site_id =
            //   d.participant
            // }
          })
          console.timeEnd(`${complianceClientProcess} Compliance Calculation Done in`);
          dbConnectionPool.end();
          return data;
        } catch (error) {
          dbConnectionPool.end();
          console.log('Error in function startComplianceCalculations:', error);
          throw error;
        }
    }
}

module.exports = ComplianceModel;
