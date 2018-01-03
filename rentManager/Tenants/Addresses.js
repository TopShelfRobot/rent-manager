const Query = require('../Query');
// const validateRecurringCharges = require('./recurringCharges.schema');

const Addresses = {
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
      // validate: validateAddresses
    });
  },

  find() { return this.get(); },


}

module.exports = base => {
  const addr = Object.create(Addresses)

  addr.base = base
  addr.basePath = '/Tenants/{id}/Addresses'

  return addr
}