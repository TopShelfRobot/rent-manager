const {assert} = require('chai');
const format = require('date-fns/format')


const rm = require('./testApi');

describe("ServiceManager", () => {
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

  describe("Issues", () => {
    it("gets a list of issues", async () => {
      const issues = await rm.ServiceManager.Issues
        .find()
        .pageSize(10)
        .exec();

      console.log("ISSUES", issues);
    })

    it.skip("creates an issue", async () => {
      const newIssue = {
        Title: 'My Test Issue',
        Description: 'Test issue created on ' + format(new Date()),
        "CategoryID": 1,
        "StatusID": 1,
        "PriorityID": 1,
        "AssignedToUserID": 1,
      }

      try {
        const response = await rm.ServiceManager.Issues.post(newIssue);
  
      } catch(err) {
        console.log(err);
        throw err
      }
      
    })
  })
})