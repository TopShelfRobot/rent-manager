
const Authentication = {

  async authorizeUser(options) {
    options = options || {};
    const {username, password, location, discardToken} = options;
    const url = this.basePath + '/AuthorizeUser'

    const req = {
      Username: username || this.base.username,
      Password: password || this.base.password,
      LocationID: location || this.base.location,
    }
    
    this.base.clearToken()

    try {
      const token = await this.base.post(url, req)
      
      if (!discardToken) this.base.setToken(token)

      return token
    } catch (err) {
      console.log("Error getting token", err)
      throw err
    }
  },

  async ChangeLocation(locationID, options) {
    const url = this.basePath + '/ChangeLocation?locationID=' + locationID;

    return await this.base.post(url, options);
  },

}

module.exports = base => {
  const authentication = Object.create(Authentication)

  authentication.base = base
  authentication.basePath = '/Authentication'

  return authentication
}