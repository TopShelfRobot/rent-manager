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

  describe.skip("Issues", () => {
    it("gets a list of issues", async () => {
      const issues = await rm.ServiceManager.Issues
        .find()
        .pageSize(10)
        .exec();

      console.log("ISSUES", issues);
    })

    it("creates an issue", async () => {
      const newIssue = {
        Title: 'My Test Issue',
        Description: 'Test issue created on ' + format(new Date()),
        "CategoryID": 1,
        "StatusID": 1,
        "PriorityID": 1,
        "AssignedToUserID": 1,
        "AssignedOpenDate": new Date(),
      }


      try {
        const response = await rm.ServiceManager.Issues.post(newIssue);
        console.log("CREATE ISSUE", JSON.stringify(response, null, 2))
  
      } catch(err) {
        console.log(err);
        throw err
      }
      
    }).timeout(5000);
  })
})