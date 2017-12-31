const Query = require('./Query');
const utils = require('./utils');

const makeFilter = (field, op, value) => {
  return [field, op, value].join(',')
}

const Properties = {
  get() {
    return Query({
      base: this.base, 
      url: this.basePath,
    })
  },
  find() { return this.get(); },
  
  async findByShortName(shortName) {
    const url = this.basePath + "?filters=" + makeFilter('ShortName', 'eq', shortName)
    return this.base.get(url).then(utils.takeFirst)
  }
}


module.exports = base => {
  const properties = Object.create(Properties)

  properties.base = base
  properties.basePath = '/Properties'

  return properties
}