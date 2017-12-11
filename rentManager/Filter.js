const isString = require('lodash/isString')
const isNil = require('lodash/isNil')

const operations = {
  eq: "EqualTo",
  ne: "NotEqualTo",
  in: "In",
  ni: "NotIn",
  ct: "Contains",
  sw: "StartsWith",
  ew: "EndsWith",
  lt: "LessThan",
  le: "LessThanOrEqualTo",
  gt: "GreaterThan",
  ge: "GreaterThanOrEqualTo",
  bt: "Between",
  gtn: "GreaterThanOrNull",
  gen: "GreaterThanOrEqualToOrNull",
  ltn: "LessThanOrNull",
  len: "LessThanOrEqualToOrNull",
  hv: "HasValue",
}

const ALLOWED_OPS = Object.keys(operations)

/**
 * 
 * @param {Object} options All options for a single filter
 * @param {*} options.prop
 * @param {*} options.op
 * @param {*} options.value
 * 
 * {
 *  prop: 'Text', op: 'eq', Value: 'House
 * }
 * => 'Text,eq,House'
 * 
 * {
 *  model: 'Amenities'
 *  prop: 'Text',
 *  op: 'eq',
 *  value: 'House'
 * }
 * => 'Amenities.Text,eq,House'
 * 
 * {
 *  model: 'Amenities',
 *  filters: [
 *    {prop: 'Text', op: 'eq', value: 'House'},
 *    {prop: 'Selected', op: 'eq', value: 'true'},
 *  ]
 * }
 * => 'Amenities(Text,eq,House).Selected,eq,true'
 * 
 */
const makeFilter = (options) => {
  // console.log("OPS", options)
  if (options.model && options.prop) {
    return simpleFilter(options.model + '.' + options.prop, options.op, options.value)
  } 
  
  if (options.prop) {
    return simpleFilter(options.prop, options.op, options.value)
  }

  if (options.model && options.filters) {
    if (options.filters.length > 2 || options.filters.length < 1) {
      throw new Error('A filter on a model may only have one or two subfilters')
    }
    
    const model = `${options.model}(${makeFilter(options.filters[0])})`
    return makeFilter({...options.filters[1], model})
  }
}

const simpleFilter = (prop, op, val) => {
  if (!isString(prop)) throw new Error(`'prop' must be a string`)
  if (!ALLOWED_OPS.includes(op)) throw new Error(`'op' is not an allowed operation (received '${op}')`)
  if (isNil(val)) throw new Error (`Expected non null/undefined for 'value`)

  return [prop, op, encodeURIComponent(val)].join(',');
}

const makeFilterString = (filters) => {
  return filters.map(makeFilter).join(';')
}

module.exports = {
  operations,
  makeFilter,
  makeFilterString,
}