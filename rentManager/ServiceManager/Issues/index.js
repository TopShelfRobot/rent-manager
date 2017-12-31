const Query = require('../../Query');
const validateIssue = require('./issue.schema');

const ServiceManagerIssues = {
  /**
   */
  get() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    return query;
  },
  find() { return this.get(); },

  post(data) {
    const results = validateIssue(data);
    if (results.error) {
      throw results.error;
    }

    return this.base.post(this.basePath, [results.value]);
  },

  async delete(id) {
    const url = (Array.isArray(id)) 
      ? `${this.basePath}?ids=(${id.join(',')})`
      : `${this.basePath}/${id}`;

    return await this.base.delete(url);
  },

  async LinkUnit(id, unitID) {
    const url = `${this.basePath}/${id}/LinkUnit?unitID=${unitID}`;

    return await this.base.post(url);
  },
  async LinkProperty(id, propertyID) {
    const url = `${this.basePath}/${id}/LinkProperty?propertyID=${propertyID}`;

    return await this.base.post(url);
  },
}

module.exports = base => {
  const issues = Object.create(ServiceManagerIssues);

  issues.base = base;
  issues.basePath = '/ServiceManagerIssues';

  issues.UserDefinedFields = require('./UserDefinedFields')(base);
  issues.UserDefinedValues = require('./UserDefinedValues')(base);

  return issues
}