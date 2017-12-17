const rp = require('request-promise')

const isRentmanagerError = err => err && err.DeveloperMessage

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

    console.log("POST OPTIONS", options)

    const response = await this.request(options)


    return response
  },

  async request(options) {
    options = Object.assign({}, options, {
      uri: this.baseUrl + options.uri
    })

    try {
      const response = await rp(options)

      return response
    } catch ({error, statusCode, options}) {
      if (isRentmanagerError(error)) {
        const err = new Error(error.DeveloperMessage)
        err.status = statusCode
        throw err
      } else {
        throw error
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
  api.Properties     = require('./Properties')(api);
  api.Units          = require('./Units')(api);
  api.ServiceManager = require('./ServiceManager')(api);
  api.Locations       = require('./Locations')(api);

  return api
}