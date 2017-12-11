const Query = require('../Query');

const ServiceManagerIssues = {
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
  const statuses = Object.create(ServiceManagerIssues)

  statuses.base = base
  statuses.basePath = '/ServiceManagerIssues'

  return statuses
}