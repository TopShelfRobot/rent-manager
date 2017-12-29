const Query = require('./Query');

const ChargeTypes = {
  /**
  
   */
  get() {
    return Query({
      base: this.base, 
      url: this.basePath,
    })
  },

  
  post(data) {
    return Query({
      base: this.base,
      url: this.basePath,
    });
  },

  find() { return this.get(); },

  async findByName(name) {
    const types = await this.get().filter('Name', 'eq', name).exec();
    if (types && types.length) return types[0];
    return null;
  },


}

module.exports = base => {
  const chargeType = Object.create(ChargeTypes)

  chargeType.base = base
  chargeType.basePath = '/ChargeTypes'

  return chargeType
}