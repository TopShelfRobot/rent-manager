const Query = require('../Query');

const Vendors = {
  get() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    Object.assign(query, { });

    return query;
  },
  find(...args) { return this.get(...args); },

  getById(id) {
    const url = this.basePath + '/' + id;
    return Query({base: this.base, url});
  },
}


module.exports = base => {
  const own = Object.create(Vendors);

  own.base = base;
  own.basePath = '/Vendors';

  return own;
}
