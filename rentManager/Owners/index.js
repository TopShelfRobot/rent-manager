const Query = require('../Query');

const Owners = {
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
  const own = Object.create(Owners);

  own.base = base;
  own.basePath = '/Owners';

  return own;
}
