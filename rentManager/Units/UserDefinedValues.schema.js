const Joi = require('joi');

const udfSchema = Joi.object({
  "UserDefinedFieldID": Joi.number(),
  "ParentID":           Joi.number(),
  "Name":               Joi.string(),
  "Value":              Joi.string(),
  "UpdateDate":         Joi.date().iso().empty(''),
  "FieldType":          Joi.number(),
})

const schema = Joi.array().items(udfSchema);

const options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
}

module.exports = data => Joi.validate(data, schema, options);