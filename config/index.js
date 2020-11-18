const env = process.env.NODE_ENV || 'dev';
// instead of importing new package "dotenv", i just added a js file to make it quick for the test
// i am using my dev database at atlas mongodb.
const config = ()=>{
  switch(env){
    case 'dev': 
    return {
      DB_URL:   'mongodb+srv://fec_app:fecappdev@feccluster0.fdi4c.gcp.mongodb.net/FEC?retryWrites=true&w=majority',
      PORT:     3000,
      HASHKEY:  'nodeTestDev',
      EXPIRESIN:'7d',
      apiKey: '677e522e448748bbba55f9bf9f0fc5c6'
    }
    case 'stg': 
    return {
      DB_URL:   'mongodb+srv://fec_app:fecappdev@feccluster0.fdi4c.gcp.mongodb.net/FEC?retryWrites=true&w=majority',
      PORT:     3000,
      HASHKEY:  'NodeTestStaging',
      EXPIRESIN:'7d',
      apiKey: '677e522e448748bbba55f9bf9f0fc5c6'
    }
    case 'prod': 
    return {
      DB_URL:   'mongodb+srv://fec_app:fecappdev@feccluster0.fdi4c.gcp.mongodb.net/FEC?retryWrites=true&w=majority',
      PORT:     3000,
      HASHKEY:  'bee3e3b012518ac1393cd676bdcae09f',// MD5 key example
      EXPIRESIN:'15m',
      apiKey: '677e522e448748bbba55f9bf9f0fc5c6'
    }
  }
}

module.exports = config();