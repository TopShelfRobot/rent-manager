const Query = require('../Query');
const validateUserDefinedValues = require('./UserDefinedValues.schema');

const UserDefinedValues = {
  /**
  
   */
  get() {
    return Query({
      base: this.base, 
      url: this.basePath,
    })
  },

  
  post(data) {
    return Query({
      base: this.base,
      url: this.basePath,
      method: 'post',
      validate: validateUserDefinedValues
    });
  },

  find() { return this.get(); },
}

module.exports = base => {
  const udf = Object.create(UserDefinedValues)

  udf.base = base
  udf.basePath = '/Tenants/{id}/UserDefinedValues'

  return udf
}