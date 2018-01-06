const Joi = require('joi');

const billsSchema = Joi.object({
  "PostDate":             Joi.date().iso().empty(''),
  "DueDate":              Joi.date().iso().empty(''),
  "AmountAllocated":      Joi.number(),
  "IsFullyAllocated":     Joi.boolean(),
  "TermID":               Joi.number(),
  "BankID":               Joi.number(),
  "DefaultBankOption":    Joi.number(),
  "PayMethod":            Joi.number(),
  "IsApproved":           Joi.boolean(),
  "ApprovalUserID":       Joi.number(),
  "ApprovalDate":         Joi.date().iso().empty(''),
  "OwnerApprovalStatus":  Joi.number(),
  "OwnerApprovalDate":    Joi.date().iso().empty(''),
  "OwnerApprovalOwnerID": Joi.number(),
  "OwnerApprovalUserID":  Joi.number(),
  "ReversalDate":         Joi.date().iso().empty(''),
  "IsXIBill":             Joi.boolean(),
  "BillDetails":          Joi.array(),
  "Attachments":          Joi.array(),
  "ID":                   Joi.number(),
  "AccountID":            Joi.number(),
  "AccountType":          Joi.number(),
  "Reference":            Joi.string(),
  "Comment":              Joi.string(),
  "Amount":               Joi.number(),
  "TransactionDate":      Joi.date().iso().empty(''),
  "CreateDate":           Joi.date().iso().empty(''),
  "CreateUserID":         Joi.number(),
  "UpdateDate":           Joi.date().iso().empty(''),
  "UpdateUserID":         Joi.number(),
  "TransactionType":      Joi.string(),
})

const schema = Joi.array().items(billsSchema);

const options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
}

module.exports = data => Joi.validate(data, schema, options);