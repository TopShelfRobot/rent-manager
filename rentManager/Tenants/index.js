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

  UploadUserDefinedValueAttachment(tenantID, udfID, filename, data) {
    const url = this.base.baseUrl(this.base.clientId) + `${this.basePath}/${tenantID}/UploadUserDefinedValueAttachment`;
    const headers = this.base.defaultHeaders();

    const udfModel = {
      UserDefinedFieldID: udfID,
      parentID: tenantID,
    }

    return this.base.http
      .post(url)
      .set(headers)
      .attach('file', filename)
      .field('udf', JSON.stringify(udfModel));
  }
}


module.exports = base => {
  const tenants = Object.create(Tenants);

  tenants.base = base;
  tenants.basePath = '/Tenants';
  tenants.RecurringCharges = require('./RecurringCharges')(base);
  tenants.Leases = require('./Leases')(base);
  tenants.UserDefinedValues = require('./UserDefinedValues')(base);
  tenants.UserDefinedFields = require('./UserDefinedFields')(base);
  tenants.Addresses = require('./Addresses')(base);

  return tenants;
}
