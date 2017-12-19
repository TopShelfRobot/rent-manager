const {assert} = require('chai');
const rm = require('./testApi');

describe("Location", () => {
  before(async() => {
    await rm.Authentication.authorizeUser();
  })

  describe("get", () => {
    it("gets a list of locations", async () => {
      const locations = await rm.Locations.find().exec();

      assert.isAbove(locations.length, 0)
      assert.property(locations[0], 'LocationID')

    })
  })

  describe.only("Changing locations", () => {
    it("changes the location", async () => {
      const startLocation = await rm.Locations.CurrentLocation();
      await rm.Authentication.ChangeLocation(startLocation.LocationID+1);
      const endLocation = await rm.Locations.CurrentLocation();

      assert.notEqual(startLocation.FriendlyName, endLocation.FriendlyName);

    })

    it("authenticates to another location", async () => {
      const RentManagerApi = require('../rentManager');

      const username = process.env.RM_USERNAME;
      const password = process.env.RM_PASSWORD;
      const clientId = process.env.RM_CLIENTID;
      const location = 3;
      const rm2 = RentManagerApi({username, password, clientId, location});

      await rm2.Authentication.authorizeUser();
      const loc = await rm2.Locations.CurrentLocation();
      assert.equal(loc.LocationID, location);

    }).timeout(5000)
  })
})