const Joi = require('joi');


const schema = Joi.object({
  "ServiceManagerIssueID":  Joi.number(),
  "Title":                  Joi.string(),
  "Description":            Joi.string(),
  "Resolution":             Joi.string(),
  "CategoryID":             Joi.number(),
  "StatusID":               Joi.number(),
  "PriorityID":             Joi.number(),
  "Hours":                  Joi.number(),
  "IsClosed":               Joi.boolean(),
  "CloseDate":              Joi.date().iso(),
  "CloseUserID":            Joi.number(),
  "AssignedOpenDate":       Joi.date().iso(),
  "AssignedCloseDate":      Joi.date().iso(),
  "DueDate":                Joi.date().iso(),
  "PayeeAccountID":         Joi.number(),
  "IsRead":                 Joi.boolean(),
  "AssignedToUserID":       Joi.number(),
  "ProjectID":              Joi.number(),
  "ProjectSequence":        Joi.number(),
  "CurrentProjectSequence": Joi.number(),
  "IsCustomerInitiated":    Joi.boolean(),
  "CustomerDescription":    Joi.string(),
  "NoteText":               Joi.string(),
  "CreateDate":             Joi.date().iso(),
  "CreateUserID":           Joi.number(),
  "UpdateDate":             Joi.date().iso(),
  "UpdateUserID":           Joi.number(),
  // "LinkedTenants":          [],
  // "LinkedProspects":        [],
  // "LinkedProperties":       [],
  // "LinkedUnits":            [],
  // "WorkOrders":             [],
  // "History":                [],
  // "UserDefinedValues":      [],
  // "TechTimes":              []
});

const options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
}

module.exports = data => Joi.validate(data, schema, options);