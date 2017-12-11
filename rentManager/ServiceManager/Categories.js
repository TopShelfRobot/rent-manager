const Query = require('../Query');

const ServiceManagerCategories = {
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
  const statuses = Object.create(ServiceManagerCategories)

  statuses.base = base
  statuses.basePath = '/ServiceManagerCategories'

  return statuses
}