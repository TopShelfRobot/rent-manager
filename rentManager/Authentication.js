
const Authentication = {

  async authorizeUser() {
    const url = this.basePath + '/AuthorizeUser'

    const req = {
      username: this.base.username,
      password: this.base.password,
    }
    if (this.base.location) req.location = this.base.location;
    
    this.base.clearToken()

    try {
      const token = await this.base.post(url, req)
      
      return this.base.setToken(token)
    } catch (err) {
      console.log("Error getting token", err)
      throw err
    }
  },

  async ChangeLocation(locationID) {
    const url = this.basePath + '/ChangeLocation?locationID=' + locationID;

    return await this.base.post(url);
  },

}

module.exports = base => {
  const authentication = Object.create(Authentication)

  authentication.base = base
  authentication.basePath = '/Authentication'

  return authentication
}