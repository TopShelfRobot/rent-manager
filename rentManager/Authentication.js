
const Authentication = {

  async authorizeUser() {
    const url = this.basePath + '/AuthorizeUser'
    const credentials = this.base.getCredentials()
    
    this.base.clearToken()

    try {
      const token = await this.base.post(url, credentials)
      
      return this.base.setToken(token)
    } catch (err) {
      console.log("Error getting token", err)
      throw err
    }
  },

}

module.exports = base => {
  const authentication = Object.create(Authentication)

  authentication.base = base
  authentication.basePath = '/Authentication'

  return authentication
}