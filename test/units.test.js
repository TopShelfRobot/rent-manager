const {assert} = require('chai');
const format = require('date-fns/format')
const RentManagerApi = require('../rentManager')
require('dotenv').config()

/**
 * { UnitID: 1,
 * PropertyID: 557,
 * Name: '301',
 * Comment: '',
 * UnitTypeID: 2,
 * Bedrooms: 1,
 * Bathrooms: 1,
 * SortOrder: 1022,
 * CreateDate: '2017-10-02T11:30:52',
 * CreateUserID: 2,
 * UpdateDate: '2017-10-02T11:30:52',
 * UpdateUserID: 2,
 * UserDefinedValues: [],
 * History: [],
 * Addresses: [],
 * UnitStatuses: [],
 * Amenities: [],
 * MarketRent: [],
 * Images: [],
 * Property: {},
 * UnitType: {},
 * Floor: {},
 * CreateUser: {},
 * UpdateUser: {},
 * MarketingData: {} }
 */

describe("Units", () => {
  let rm;

  before(async () => {
    if (
      !process.env.RM_USERNAME ||
      !process.env.RM_PASSWORD ||
      !process.env.RM_CLIENTID
    ) {
      throw new Error('In order to test Units api, you must set RM_USERNAMEm RM_PASSWORD, RM_CLIENTID environment variables')
    }

    const username = process.env.RM_USERNAME
    const password = process.env.RM_PASSWORD
    const clientId = process.env.RM_CLIENTID

    rm = RentManagerApi({username, password, clientId})
    await rm.Authentication.authorizeUser()
  })

  describe.only('search()', () => {
    it("gets a list of units", async () => {
      const units = await rm.Units.search()
      
      assert.isOk(units)
      assert.isArray(units)
    })

    it("puts a limit on the returned items", async () => {
      const pageSize = 2;
      const units = await rm.Units.search({pageSize})

      assert.equal(units.length, 2)
    })

    it("puts a limit on the returned items via fluent API", async () => {
      const q = rm.Units.find()
        .pageSize(2)
        
      const units = await q.exec();
      assert.equal(units.length, 2);
    })

    it("retrieves a specified page", async () => {
      const baseUnits = await rm.Units.search({pageSize: 6})
      const page1 = await rm.Units.search({pageSize: 2, pageNumber: 1})
      const page2 = await rm.Units.search({pageSize: 2, pageNumber: 2})
      const page3 = await rm.Units.search({pageSize: 2, pageNumber: 3})

      assert.equal(baseUnits[0].UnitId, page1[0].UnitId)
      assert.equal(baseUnits[2].UnitId, page2[0].UnitId)
      assert.equal(baseUnits[4].UnitId, page3[0].UnitId)
    }).timeout(5000)

    describe("searching on Amenities", () => {
      it("retrieves units with a single amenity selected", async () => {
        const Amenity = 'Dogs Allowed';
        const pageSize = 15;
        const embeds = ["Amenities"];
        const filters = [
          {
            model: 'Amenities',
            filters: [
              {prop: 'Text', op: 'eq', value: Amenity},
              {prop: 'Selected', op: 'eq', value: 'true'},
            ]
          },
        ];
        const units = await rm.Units.search({pageSize, filters, embeds});
        
        assert.isAbove(units.length, 0, "Did not find any units");
        units.forEach(u => {
          const am = u.Amenities.find(a => a.Text === Amenity)
          assert.isOk(am)
          assert.equal(am.Selected, true)
        });
      }).timeout(15000)
      
      it("retrieves units with multiple Amenities selected", async () => {
        const Amenity1 = 'Dogs Allowed';
        const Amenity2 = 'Water Paid';
        const pageSize = 15;
        const embeds = ["Amenities"];
        const filters = [
          {
            model: 'Amenities',
            filters: [
              {prop: 'Text', op: 'eq', value: Amenity1},
              {prop: 'Selected', op: 'eq', value: 'true'},
            ]
          },
          {
            model: 'Amenities',
            filters: [
              {prop: 'Text', op: 'eq', value: Amenity2},
              {prop: 'Selected', op: 'eq', value: 'true'},
            ]
          },
        ];
        
        const units = await rm.Units.search({pageSize, filters, embeds});
        
        assert.isAbove(units.length, 0, "Did not find any units");
        units.forEach((u, idx) => {
          const am1 = u.Amenities.find(a => a.Text === Amenity1)
          const am2 = u.Amenities.find(a => a.Text === Amenity2)
          assert.isOk(am1)
          assert.isOk(am2)
          // assert.equal(am1.Selected || am2.Selected, true)
          assert.equal(am1.Selected, true, `Expected amentiy '${am1.Text}' to be true on unit #${idx}`)
          assert.equal(am2.Selected, true, `Expected amentiy '${am2.Text}' to be true on unit #${idx}`)
        });
      }).timeout(15000)
    })

    
    describe.skip("embeds", () => {
      it("embeds amenities on request", async () => {
        const units = await rm.Units.search({pageSize: 10, embeds: ['Amenities']})
        
        console.log(units.filter(u => u.Amenities.length)[0].Amenities)
      })
    })

  })
})