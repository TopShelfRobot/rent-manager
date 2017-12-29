const Query = require('../Query');

const Tenants = {
  find() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    Object.assign(query, { });

    return query;
  }
}


module.exports = base => {
  const tenants = Object.create(Tenants);

  tenants.base = base;
  tenants.basePath = '/Tenants';
  tenants.RecurringCharges = require('./RecurringCharges')(base);

  return tenants;
}
