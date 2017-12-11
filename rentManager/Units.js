const {makeFilter, makeFilterString} = require('./Filter')

const ALLOWED_EMBEDS = [
  'Addresses', 'Amenities', 'CreateUser', 'Floor',
  'History', 'Images', 'Leases', 'MarketingData',
  'MarketRent', 'Property', 'UnitStatuses', 'UnitType',
  'UpdateUser', 'UserDefinedValues'
]


const Units = {
  /**
   * 
   * @param {Object} options 
   * @param {Array} options.filters
   * @param {Array} options.embeds An array of strings identifying child objects to include in the return results
   */
  search({filters, embeds, fields, pageSize=50, pageNumber=1}={}) {

    let qs = []
    if (filters && filters.length) {
      qs.push(`filters=${makeFilterString(filters)}` )
    }

    if (embeds && embeds.length) {
      const unknown = embeds.filter(emb => !ALLOWED_EMBEDS.includes(emb))
      if (unknown.length) throw new Error(`Unknown embeds: [${unknown.join(', ')}]`)

      qs.push(`embeds=${embeds.join(',')}`)
    }

    if (fields) qs.push(`fields=${fields}`)
    if (pageSize) qs.push(`pageSize=${pageSize}`)
    if (pageNumber) qs.push(`pageNumber=${pageNumber}`)

    qs = (qs) ? '?' + qs.join('&') : '';

    const url = this.basePath + qs;
    console.log("URL", url)
    
    try {
      const units = await = this.base.get(url);
      return units;
    } catch (err) {
      console.log("Error getting units", err);
      throw err;
    }

  }
}


module.exports = base => {
  const units = Object.create(Units)

  units.base = base
  units.basePath = '/units'

  return units
}