const Query = require('../Query');

const GLAccounts = {
  get() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })

    return query;
  },
  find(...args) { return this.get(...args); },

}


module.exports = base => {
  const own = Object.create(GLAccounts);

  own.base = base;
  own.basePath = '/GLAccounts';

  return own;
}
