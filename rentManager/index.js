// const rp = require('request-promise')
const request = require('superagent');
const debug = require('debug')('base');

const isResponseError = err => err && err.response && err.response.body;
const isRentmanagerError = err => err && err.DeveloperMessage;

const Api = {

  defaultHeaders({token}) {
    return Object.assign({}, this.tokenHeader(token || this.token))
  },

  tokenHeader(token) {
    return token
      ? {'X-RM12Api-ApiToken': token}
      : {};
  },

  baseUrl(clientId) { return `https://${clientId}.api.rentmanager.com`;},
  

  async get(uri, options={}) {
    options = Object.assign({}, options, {
      method: 'GET',
      uri: uri,
    });

    const response = await this.request(options)
    return response
  },

  

  async post(uri, data, options={}) {
    options = Object.assign({}, options, {
      method: 'POST',
      uri: uri,
      body: data,
    });

    const response = await this.request(options)
    return response
  },

  async delete(uri, options={}) {
    options = Object.assign({}, options, {
      method: 'DELETE',
      uri: uri,
    });
    
    const response = await this.request(options)
    return response
  },
  
  async request(options) {
    const headers = this.defaultHeaders(options)

    options = Object.assign({}, options, {
      uri: this.baseUrl(options.clientId || this.clientId) + options.uri,
      headers: Object.assign(headers, (options.headers || {})),
      json: true,
    })

    try {
      const response = await request(options.method, options.uri)
        .set(options.headers)
        .type('json')
        .send((options.body) ? JSON.stringify(options.body) : '');

      return (options.fullResponse) ? response : response.body;
    } catch(error) {
      if (!isResponseError(error)) throw error;

      const responseError = error.response.body;
      if (isRentmanagerError(responseError)) {
        const err = new Error(responseError.DeveloperMessage)
        err.status = error.status;
        err.original = responseError;
        err.uri = options.uri;
        throw err
      } else  {
        const err = new Error(responseError.message || responseError.Message);
        err.body = responseError;
        err.status = error.status;
        err.uri = options.uri;
        throw err;
      }
    }
  },



  getToken() { return this.token },
  setToken(token) { return this.token = token },
  clearToken() { return this.setToken() },

  getCredentials() { return this.credentials },
  getLocation() { return this.location; },
  setLocation(location) { this.location = location; },



}


module.exports = (options) => {
  options = options || {};
  const {username, password, clientId, location} = options;
  // TODO: make sure we have username, password, clientId
  

  const api = Object.create(Api)
  api.credentials = { username, password };
  api.username = username;
  api.password = password;
  api.clientId = clientId;
  api.location = location;
  api.token = null

  api.http = request;

  api.Filter         = require('./Filter');
  api.Authentication = require('./Authentication')(api);
  api.Users          = require('./Users')(api);
  api.Properties     = require('./Properties')(api);
  api.Units          = require('./Units')(api);
  api.ServiceManager = require('./ServiceManager')(api);
  api.Locations      = require('./Locations')(api);
  api.Tenants        = require('./Tenants')(api);
  api.Leases         = require('./Leases')(api);
  api.ChargeTypes    = require('./ChargeTypes')(api);
  api.Owners         = require('./Owners')(api);
  api.Vendors        = require('./Vendors')(api);
  api.GLAccounts     = require('./GLAccounts')(api);

  return api
}