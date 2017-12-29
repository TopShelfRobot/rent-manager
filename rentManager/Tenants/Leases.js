const Query = require('../Query');
const validateRecurringCharges = require('./recurringCharges.schema');

const Leases = {
  /**
  
   */
  get() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    // Object.assign(query, {
    //   filterCurrent() {

    //     const sub = this._makeFilter('Text', 'eq', amenity);
    //     this.filter(`Amenities(${sub}).Selected`, 'eq', 'true');

    //     return this;
    //   },
    //   filterUdf(udfName, op, udfValue) {
    //     const sub = this._makeFilter('Name', 'eq', udfName);
    //     this.filter(`UserDefinedValues(${sub}).Value`, op, udfValue);

    //     return this;
    //   }
    // });
    return query;

  },

  // getCurrent() {
  //   return this.get()
  // },


  find() { return this.get(); },


}

module.exports = base => {
  const leases = Object.create(Leases)

  leases.base = base
  leases.basePath = '/Tenants/{id}/Leases'

  return leases
}