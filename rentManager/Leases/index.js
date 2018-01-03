const Query = require('../Query');

const Leases = {
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
  const lse = Object.create(Leases);

  lse.base = base;
  lse.basePath = '/Leases';

  return lse;
}
