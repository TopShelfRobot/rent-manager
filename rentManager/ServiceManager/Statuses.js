const Query = require('../Query');

const ServiceManagerStatuses = {
  /**
   * {  ServiceManagerStatusID: 1,
   *    Name: '<Unassigned>',
   *    Description: 'Status has not been assigned',
   *    SortOrder: 1,
   *    Color: '#000000' }
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
  const statuses = Object.create(ServiceManagerStatuses)

  statuses.base = base
  statuses.basePath = '/ServiceManagerStatuses'

  return statuses
}