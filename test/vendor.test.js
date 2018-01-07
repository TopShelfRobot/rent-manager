const {assert} = require('chai');

const rm = require('./testApi');


describe.only("Vendor", () => {
  before(async () => {
    await rm.Authentication.authorizeUser();
  })

  describe("Bills", () => {
    it("gets bills for a vendor", async () => {
      const bills = await rm.Vendors.Bills.get().param('id', 1).exec();
      assert.isAtLeast(bills.length, 1);
    })

    it.only("creates a bill for a vendor", async () => {
      const bill = {
        TransactionDate: (new Date()).toISOString(),
        PostDate: (new Date()).toISOString(),
        DueDate: (new Date()).toISOString(),
        Comment: 'This is a comment',
        BillDetails: [
          {
            Amount: 123,
            PropertyID: 1,
            GLAccountID: 42,
          }
        ]
        
      }

      try {
        const response = await rm.Vendors.Bills
          .post()
          .param('id', 1)
          .data([bill])
          .exec();

          console.log(response);
      } catch(err) {
        console.error(err);
        throw err;
      }


    })
  })
})