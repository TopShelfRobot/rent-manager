const {assert} = require('chai');

const rm = require('./testApi');

describe.only("ServiceManager", () => {
  before(async () => {
    await rm.Authentication.authorizeUser();
  })

  describe("Statuses", () => {
    it("fetches a list of issue statuses", async () => {
      const statuses = await rm.ServiceManager.Statuses.find().exec();

      assert.isAbove(statuses.length, 0)
      assert.property(statuses[0], 'ServiceManagerStatusID')
    })

  })
})