const Query = require('../Query');

const Tenants = {
  find() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    Object.assign(query, { });

    return query;
  },

  getById(id) {
    const url = this.basePath + '/' + id;
    return Query({base: this.base, url});
  },
}


module.exports = base => {
  const tenants = Object.create(Tenants);

  tenants.base = base;
  tenants.basePath = '/Tenants';
  tenants.RecurringCharges = require('./RecurringCharges')(base);
  tenants.Leases = require('./Leases')(base);
  tenants.UserDefinedValues = require('./UserDefinedValues')(base);

  return tenants;
}
