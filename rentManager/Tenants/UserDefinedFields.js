const Query = require('../Query');

const UserDefinedFields = {
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
  const udf = Object.create(UserDefinedFields)

  udf.base = base
  udf.basePath = '/Tenants/UserDefinedFields'

  return udf
}