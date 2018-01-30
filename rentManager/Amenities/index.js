const Query = require('../Query');

const Amenities = {
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
  const amenities = Object.create(Amenities);

  amenities.base = base;
  amenities.basePath = '/Amenities';

  return amenities;
}
