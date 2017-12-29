const Query = require('./Query');

const Users = {
  /**
  
   */
  get() {
    return Query({
      base: this.base, 
      url: this.basePath,
    })
  },

  

  find() { return this.get(); },

}

module.exports = base => {
  const users = Object.create(Users)

  users.base = base
  users.basePath = '/Users'

  return users
}