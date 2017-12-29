const Joi = require('joi');

const recurringChargeSchema = Joi.object({
  "RecurringChargeID":    Joi.number(),
  "EntityType":           Joi.number().required(),
  "EntityKeyID":          Joi.number(),
  "UnitID":               Joi.number().required(),
  "Frequency":            Joi.number().required(),
  "ChargeTypeID":         Joi.number(),
  "Amount":               Joi.number(),
  "AmountPerSquareFoot":  Joi.number(),
  "Comment":              Joi.string(),
  "FromDate":             Joi.date().iso().empty(''),
  "ToDate":               Joi.date().iso().empty(''),
  "IsCalculated":         Joi.boolean(),
  "Calculation":          Joi.string(),
  "CamRecurringChargeID": Joi.number(),
  "SortOrder":            Joi.number(),
  "CreateDate":           Joi.date().iso().empty(''),
  "CreateUserID":         Joi.number(),
  "UpdateDate":           Joi.date().iso().empty(''),
  "UpdateUserID":         Joi.number(),
})

const schema = Joi.array().items(recurringChargeSchema);

const options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
}

module.exports = data => Joi.validate(data, schema, options);