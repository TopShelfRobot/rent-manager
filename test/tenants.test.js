const {assert} = require('chai');
const path = require('path');

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

  describe.only("UploadUserDefinedValueAttachment", () => {
    it("uploads a file to rm", async () => {
      const tenantID = 10;
      const tenantLedgerUdfID = 120;
      const filename = path.join(__dirname, '10-Cory-Schaeffer-structureLedger.pdf');

      try {
        const results = await rm.Tenants.UploadUserDefinedValueAttachment(tenantID, tenantLedgerUdfID, filename);
        console.log(results);
      } catch(err) {
        console.error(JSON.stringify(err, null, 2))
        throw err;
      }
    })
  })
})