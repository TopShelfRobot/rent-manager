const Query = require('../Query');

const CurrentUser = {
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
  const cu = Object.create(CurrentUser)

  cu.base = base
  cu.basePath = '/Users/CurrentUser'

  return cu
}