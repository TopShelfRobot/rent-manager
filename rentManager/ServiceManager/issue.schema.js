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
  "CloseDate":              Joi.date().iso().empty(''),
  "CloseUserID":            Joi.number(),
  "AssignedOpenDate":       Joi.date().iso().empty(''),
  "AssignedCloseDate":      Joi.date().iso().empty(''),
  "DueDate":                Joi.date().iso().empty(''),
  "PayeeAccountID":         Joi.number(),
  "IsRead":                 Joi.boolean(),
  "AssignedToUserID":       Joi.number(),
  "ProjectID":              Joi.number(),
  "ProjectSequence":        Joi.number(),
  "CurrentProjectSequence": Joi.number(),
  "IsCustomerInitiated":    Joi.boolean(),
  "CustomerDescription":    Joi.string(),
  "NoteText":               Joi.string(),
  "CreateDate":             Joi.date().iso().empty(''),
  "CreateUserID":           Joi.number(),
  "UpdateDate":             Joi.date().iso().empty(''),
  "UpdateUserID":           Joi.number(),
  // "LinkedTenants":          [],
  // "LinkedProspects":        [],
  // "LinkedProperties":       [],
  "LinkedUnits":            Joi.array(),
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