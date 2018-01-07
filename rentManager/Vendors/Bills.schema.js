const Joi = require('joi');

const billDetailSchema = Joi.object({
  // "BillDetailID": Joi.number(),
  // "BillID": 2,
  "PostDate":        Joi.date().iso().empty(''),
  "PropertyID":      Joi.number().required(),
  "UnitID":          Joi.number(),
  "Is1099":          Joi.boolean(),
  "Amount":          Joi.number().required(),
  "AmountAllocated": Joi.number(),
  "GLAccountID":     Joi.number().required(),
  "Comment":         Joi.string(),
  "SortOrder":       Joi.number(),
  "CreateDate":      Joi.date().iso().empty(''),
  "CreateUserID":    Joi.number(),
  "UpdateDate":      Joi.date().iso().empty(''),
  "UpdateUserID":    Joi.number()
});

const billsSchema = Joi.object({
  "TransactionDate":      Joi.date().iso().empty('').required(),
  "PostDate":             Joi.date().iso().empty('').required(),
  "DueDate":              Joi.date().iso().empty('').required(),
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
  "BillDetails":          Joi.array().items(billDetailSchema).required(),
  "Attachments":          Joi.array(),
  "ID":                   Joi.number(),
  "AccountID":            Joi.number(),
  "AccountType":          Joi.number(),
  "Reference":            Joi.string(),
  "Comment":              Joi.string(),
  "Amount":               Joi.number(),
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