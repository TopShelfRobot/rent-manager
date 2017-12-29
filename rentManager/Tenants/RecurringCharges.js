const Query = require('../Query');

const RecurringCharges = {
  /**
  
   */
  find() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    return query;
  }

}

module.exports = base => {
  const statuses = Object.create(RecurringCharges)

  statuses.base = base
  statuses.basePath = '/RecurringCharges'

  return statuses
}