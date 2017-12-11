const RentManagerApi = require('../rentManager')
require('dotenv').config()

if (
  !process.env.RM_USERNAME ||
  !process.env.RM_PASSWORD ||
  !process.env.RM_CLIENTID
) {
  throw new Error('In order to test Units api, you must set RM_USERNAMEm RM_PASSWORD, RM_CLIENTID environment variables');
}

const username = process.env.RM_USERNAME;
const password = process.env.RM_PASSWORD;
const clientId = process.env.RM_CLIENTID;
const rm = RentManagerApi({username, password, clientId});

module.exports = rm;