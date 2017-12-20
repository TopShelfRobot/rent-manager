const Query = require('../Query');
const validateIssue = require('./issue.schema');

const ServiceManagerIssues = {
  /**
   */
  find() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    return query;
  },

  post(data) {
    const results = validateIssue(data);
    if (results.error) {
      console.error(results.error);
      throw new Error("Error validating Service Issue", results.error.message);
    }

    return this.base.post(this.basePath, [results.value]);
  },

  async delete(id) {
    const url = `${this.basePath}/${id}`;

    return await this.base.delete(url);
  },

  async LinkUnit(id, unitID) {
    const url = `${this.basePath}/${id}/LinkUnit?unitID=${unitID}`;

    return await this.base.post(url);
  },
}

module.exports = base => {
  const statuses = Object.create(ServiceManagerIssues)

  statuses.base = base
  statuses.basePath = '/ServiceManagerIssues'

  return statuses
}