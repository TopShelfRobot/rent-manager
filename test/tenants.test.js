const {assert} = require('chai');

const rm = require('./testApi');


describe("Tenants", () => {
  before(async () => {
    await rm.Authentication.authorizeUser();
  })

  
  describe("RecurringCharges", () => {
    it("gets recurring charges for a tenant", async () => {
      console.log(process.env.DEBUG)
      const rc = await rm.Tenants.RecurringCharges.get().param('id', 123).exec();
    })
  })
})