const {makeFilter, makeFilterString} = require('./Filter')
const Query = require('./Query');

const ALLOWED_EMBEDS = [
  'Addresses', 'Amenities', 'CreateUser', 'Floor',
  'History', 'Images', 'Leases', 'MarketingData',
  'MarketRent', 'Property', 'UnitStatuses', 'UnitType',
  'UpdateUser', 'UserDefinedValues'
]


const Units = {

  find() {
    const query = Query({
      base: this.base, 
      url: this.basePath,
    })
    
    Object.assign(query, {
      filterAmenity(amenity) {
        const sub = this._makeFilter('Text', 'eq', amenity);
        this.filter(`Amenities(${sub}).Selected`, 'eq', 'true');
        
        return this;
      },
      filterUdf(udfName, op, udfValue) {
        const sub = this._makeFilter('Name', 'eq', udfName);
        this.filter(`UserDefinedValues(${sub}).Value`, op, udfValue);
        
        return this;
      }
    });
    
    return query;
  },
  
  post() {
    const query = Query({
      method: 'post',
      base: this.base, 
      url: this.basePath,
    })
    
  },

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