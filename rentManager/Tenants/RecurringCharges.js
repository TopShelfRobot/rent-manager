const Query = require('../Query');
const validateRecurringCharges = require('./recurringCharges.schema');

const RecurringCharges = {
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
      validate: validateRecurringCharges
    });
  },

  find() { return this.get(); },


}

module.exports = base => {
  const recurringCharges = Object.create(RecurringCharges)

  recurringCharges.base = base
  recurringCharges.basePath = '/Tenants/{id}/RecurringCharges'

  return recurringCharges
}