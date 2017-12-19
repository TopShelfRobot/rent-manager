const Query = require('./Query');

const Location = {
  find() {
    const q = Query({base: this.base, url: this.basePath});
    return q;
  },

  /**
   * Retrieves the current location
   * {
   *  "LocationID": 1,
   *  "Name": "sample string 2",
   *  "FriendlyName": "sample string 3",
   *  "IsMainLocation": true,
   *  "IsLWAEnabled": true,
   *  "IsTWAEnabled": true,
   *  "IsOWAEnabled": true,
   *  "IsAvidPay": true,
   *  "IsOAPEnabled": true
   * }
   */
  async CurrentLocation() {
    const url = this.basePath + '/CurrentLocation';

    return await this.base.get(url);
  },
}


module.exports = base => {
  const location = Object.create(Location);

  location.base = base;
  location.basePath = '/Locations';

  return location;
}