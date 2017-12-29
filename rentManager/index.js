// const rp = require('request-promise')
const request = require('superagent');
const debug = require('debug')('base');

const isResponseError = err => err && err.response && err.response.body;
const isRentmanagerError = err => err && err.DeveloperMessage;

const Api = {

  defaultHeaders() {
    const headers = {}
    if (this.token) headers['X-RM12Api-ApiToken'] = this.token

    return headers
  },

  async get(uri) {
    const headers = this.defaultHeaders()
    const options = {
      method: 'GET',
      uri: uri,
      headers: Object.assign(headers, {}),
      json: true,
    }

    const response = await this.request(options)
    return response
  },

  

  async post(uri, data) {
    const headers = this.defaultHeaders()
    const options = {
      method: 'POST',
      uri: uri,
      body: data,
      json: true,
      headers: Object.assign(headers, {})
    }

    const response = await this.request(options)
    return response
  },

  async delete(uri) {
    const headers = this.defaultHeaders()
    const options = {
      method: 'DELETE',
      uri: uri,
      headers: Object.assign(headers, {}),
      json: true,
    }

    const response = await this.request(options)
    return response
  },

  async request(options) {
    options = Object.assign({}, options, {
      uri: this.baseUrl + options.uri
    })

    try {
      const response = await request(options.method, options.uri)
        .set(options.headers)
        .type('json')
        .send((options.body) ? JSON.stringify(options.body) : '');

      return response.body;
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


module.exports = ({username, password, clientId, location}) => {
  // TODO: make sure we have username, password, clientId
  

  const api = Object.create(Api)
  api.credentials = { username, password };
  api.username = username;
  api.password = password;
  api.clientId = clientId;
  api.location = location;
  api.baseUrl = `https://${clientId}.api.rentmanager.com`
  api.token = null

  api.Filter         = require('./Filter');
  api.Authentication = require('./Authentication')(api);
  api.Users = require('./Users')(api);
  api.Properties     = require('./Properties')(api);
  api.Units          = require('./Units')(api);
  api.ServiceManager = require('./ServiceManager')(api);
  api.Locations       = require('./Locations')(api);
  api.Tenants       = require('./Tenants')(api);
  api.ChargeTypes = require('./ChargeTypes')(api);

  return api
}