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
})