const path = require('path');
const Query = require('../Query');

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

    return query;
  },

  LinkAmenities(unitID, unitAmenityIDs) { return this.LinkUnlinkAmenities(true, unitID, unitAmenityIDs); },
  UnLinkAmenities(unitID, unitAmenityIDs) { return this.LinkUnlinkAmenities(false, unitID, unitAmenityIDs); },
  LinkUnlinkAmenities(link, unitID, unitAmenityIDs) {
    unitAmenityIDs = (Array.isArray(unitAmenityIDs)) ? unitAmenityIDs : [unitAmenityIDs];
    const linkPath = (link) ? 'LinkAmenities' : 'UnLinkAmenities';
    const method = (link) ? 'POST' : 'DELETE';
    const query = Query({
      method: method,
      base: this.base,
      url: path.join(this.basePath, String(unitID), linkPath)
    })

    return query.data(unitAmenityIDs).exec();
  },

}


module.exports = base => {
  const units = Object.create(Units)

  units.base = base
  units.basePath = '/Units'

  units.UserDefinedValues = require('./UserDefinedValues')(base);

  return units
}