
const Authentication = {

  async authorizeUser({username, password, location, discardToken}) {
    const url = this.basePath + '/AuthorizeUser'

    const req = {
      username: username || this.base.username,
      password: password || this.base.password,
      location: location || this.base.location,
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