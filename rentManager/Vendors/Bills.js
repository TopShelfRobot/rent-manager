const Query = require('../Query');
const validateBill = require('./Bills.schema');

const VendorBills = {
  get() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    Object.assign(query, { });

    return query;
  },
  find(...args) { return this.get(...args); },

  post() {
    const query = Query({
      method: 'post',
      base: this.base,
      url: this.basePath,
      validate: validateBill,
    })

    return query;
  },

}


module.exports = base => {
  const vb = Object.create(VendorBills);

  vb.base = base;
  vb.basePath = '/Vendors/{id}/Bills';

  return vb;
}
