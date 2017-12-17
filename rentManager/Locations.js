const Query = require('./Query');

const Location = {
  find() {
    const q = Query({base: this.base, url: this.basePath});
    return q;
  }
}


module.exports = base => {
  const location = Object.create(Location);

  location.base = base;
  location.basePath = '/Locations';

  return location;
}