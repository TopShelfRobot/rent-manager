const Query = require('../Query');

const UnitTypes = {
  get() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    Object.assign(query, { });

    return query;
  },
  find(...args) { return this.get(...args); },
}


module.exports = base => {
  const uTypes = Object.create(UnitTypes);

  uTypes.base = base;
  uTypes.basePath = '/UnitTypes';

  return uTypes;
}
