const utils = require('./utils')

const makeFilter = (field, op, value) => {
  return [field, op, value].join(',')
}

const Properties = {
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